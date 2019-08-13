import * as assert from 'assert';

import { l } from '~/node/logger';
import { pool } from '~/node/db';
import { measure } from '~/node/util/perf';

export class BaseRepo {
  constructor ({ db = pool, logger = l }) {
    function BaseRepo_query (config, values) {
      return new Promise((resolve, reject) => {
        const perf = measure();
        db.query(config, values, (err, result) => {
          const inspection = config.text
            ? { ms: perf(), params: config.values }
            : { ms: perf(), params: values };
  
          if (err) {
            logger.error({ ...inspection, err }, config.text || config);
            reject(err);
          } else {
            logger.debug({ ...inspection, rowCount: result.rowCount }, config.text || config);
            resolve(result);
          }
        });
      })
    };

    this._query = BaseRepo_query;
  }

  async query (spec) {
    const { rows } = await this._query(spec.toSql());
    return rows;
  }

  save () {
    throw new Error('not implemented');
  }
}
