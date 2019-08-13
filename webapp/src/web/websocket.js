function createWebsocket (url, options) {
  return Object.assign(new WebSocket(url), options);
}

export function websocketFactory () {
  const reqid = document.querySelector('meta[name=reqid]');
  const reqidParam = reqid ? '?reqid=' + reqid.content : '';

  const buffer = [];

  const socketProtocol = location.protocol === 'https:' ? 'wss://' : 'ws://';

  const bufferedSend = (msg) => {
    buffer.push(msg);
  };

  const decorator = {
    onopen () {},
    onclose (evt) {},
    onmessage (evt) {},
    onerror (err) {},
    send: bufferedSend,
  };

  const socketConfiguration = {
    onopen () {
      console.debug('Websocket: connection established');
      decorator.onopen();
      buffer.forEach(msg => { ws.send(msg); });
      buffer.length = 0;
      decorator.send = (msg) => ws.send(msg);
    },

    onclose (event) {
      if (event.wasClean) {
        console.debug('Websocket: connection close was clean');
      } else {
        console.warn('Websocket: connection lost'); // probably, server was killed
      }
      console.debug('Websocket: code', event.code, 'reason', event.reason);
      decorator.send = bufferedSend;
      decorator.onclose(event);
      setTimeout(() => {
        ws = tryConnect();
      }, 5000);
    },

    onmessage (event) {
      console.log('Websocket: data received from server', event.data);
      decorator.onmessage(event);
    },

    onerror (error) {
      console.error('Websocket: error', error);
      decorator.onerror(error);
    },
  };
  const tryConnect = () => createWebsocket(
    socketProtocol + location.host + '/relay' + reqidParam,
    socketConfiguration
  );

  let ws = tryConnect();

  return decorator;
}
