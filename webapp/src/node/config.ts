import { cpus } from 'os';

import { readJSONFile } from './util/_fileReader';

type IMode = 'development' | 'test' | 'staging' | 'production';

type IDefaultConfig = typeof shadowConfig;

interface IConfig extends IDefaultConfig {
  [key: string]: any;
}

const NAME = 'likr';
const wellKnownLocation = `/etc/${NAME}/config.json`;

const mode = (process.env['NODE_ENV'] as IMode) || 'development';
const concurrency = process.env['WEB_CONCURRENCY'];
const workers = (mode === 'development')
  ? 0
  : (concurrency ? parseInt(concurrency, 10) : null) || cpus().length;
const db = process.env['POSTGRES_URL'] || process.env['DATABASE_URL'];
const maxDatabaseConnections = 5;

const shadowConfig = {
  name: NAME,
  port: process.env['PORT'] || '7899',
  mode,
  workers,
  db,
  maxDatabaseConnections,
};

export function reloadConfig () {
  for (const prop of Object.keys(config)) {
    delete config[prop];
  }

  Object.assign(
    config,
    shadowConfig,
    readJSONFile(wellKnownLocation) as null | IConfig
  );
}

export const config = Object.create(shadowConfig) as IConfig;

reloadConfig();
