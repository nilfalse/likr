import * as assert from 'assert';

import { BaseRepo } from '../_Base/BaseRepo';

import { tableName } from './constants';

export class FactsRepo extends BaseRepo {
  async save ({ ref, type, payload, meta }) {
    const { rows, rowCount } = await this._query(
      `INSERT INTO ${tableName} (ref, type, payload, meta) VALUES ($1, $2, $3, $4) RETURNING *`,
      [ ref, type, payload, meta ]
    );
    assert(rowCount === 1, 'unexpected affected facts count');

    return rows[0];
  }

  async query (spec) {
    const facts = await super.query(spec);
    return facts.map(({ id, type, payload, meta, ...rest }) => ({
      type,
      payload,
      meta: {
        ...meta,
        factId: id,
      },
      ...rest,
    }));
  }
}
