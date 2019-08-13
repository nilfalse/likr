import { measure } from '~/node/util/perf';

import { tableName, notifyChannelName } from './constants';

export class FactsPublisher {
  constructor ({ bus, logger }) {
    this._bus = bus;
    this._logger = logger;
  }

  publish (ref) {
    return new Promise(resolve => {
      const perf = measure();
      this._bus.query(`NOTIFY "${notifyChannelName}", 'ref:${ref}'`, (err, res) => {
        const logObj = { ms: perf(), ref };
        if (err) {
          this._logger.err({ ...logObj, err }, 'fact publishing failed');
        } else {
          this._logger.trace(logObj, 'fact published');
        }
        resolve();
      });
    });
  }
}
