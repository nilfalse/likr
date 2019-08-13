import * as fs from 'fs';
import * as cluster from 'cluster';

import { config, reloadConfig } from './config';
import { l } from './logger';
import { app } from './app';

const stopSignals = [
  'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
  'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGTERM',
];

function start () {
  const sock = config.socket;

  function listen () {
    if (sock) {
      listenOnSocket();
    } else {
      listenOnPort(config.port);
    }
  }

  function listenOnPort (port) {
    const { mode } = config;
    app.listen(port, function() {
      l.info({ mode, port }, 'listening on port');
    });
  }

  function listenOnSocket () {
    const { mode } = config;
    // var oldUmask = process.umask(0o000);

    app.listen(sock, () => {
      // process.umask(oldUmask);
      fs.chmodSync(sock, 0o666);

      l.info({ mode, sock }, 'listening at socket');
    });
  }

  process.on('warning', (warning) => l.warn({ warning }, 'process.warning'));
  process.on('unhandledRejection', (reason) => l.error({ err: reason }, 'unhandledRejection'));

  if (cluster.isMaster) {
    const workers = config.workers;
    let isStopping = false;

    const handleSignal = (signal) => {
      isStopping = true;
    
      l.info({ signal }, 'received signal, stopping workers');
      cluster.disconnect(() => process.exit());
    };

    const freeSocket = () => {
      // remove previous socket if any
      try {
        if (sock) {
          fs.unlinkSync(sock);
        }
      } catch (err) {
        // suppress ENOENT error as it simply means the sock didn't previously exist
        if (err.code !== 'ENOENT') {
          l.error({ err, sock }, 'error while trying to remove socket');
        }
      }
    };

    process.on('exit', (code) => l.warn({ code }, 'bye'));
    process.on('uncaughtException', (err) => {
      l.fatal({ err }, 'uncaughtException');
      process.exit(1);
    });
    stopSignals.forEach((signal) => process.on(signal, handleSignal));

    cluster.on('disconnect', () => {
      if (!isStopping) {
        cluster.fork();
      }
    });

    cluster.on('exit', (worker, code, signal) => {
      l.warn({ wpid: worker.process.pid, code, signal }, 'worker shut down');
    });

    cluster.setupMaster({
      execArgv: process.execArgv.filter(s => s.indexOf('--debug') === -1)
    });

    freeSocket();
    if (workers) {
      l.info({ workers }, 'forking workers');
      for (let i = 0; i < workers; i++) {
        cluster.fork();
      }
    } else {  // skip cluster if no workers
      listen();
    }
  } else {
    process.on('uncaughtException', (err) => {
      l.error({ err }, 'uncaughtException');
      process.exit(1);
    });

    listen();
  }
}

// TODO how do others switch from socket to socket
process.on('SIGHUP', (signal) => {
  reloadConfig();
  l.info(config, signal + ' received, config reloaded');
});

if (module.hot) {
  module.hot.status((status) => {
    if (status === 'fail') {
      l.warn({}, 'hot reload failed, terminating the process');
      setTimeout(() => process.exit(1));
    }
  });
}

start();
