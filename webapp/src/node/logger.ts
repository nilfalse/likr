import { createLogger, stdSerializers } from 'bunyan';

import { config } from './config';

export const l = createLogger({
  name: config.name,
  src: config.mode !== 'production',
  serializers: stdSerializers,
});
