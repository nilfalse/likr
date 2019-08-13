import * as assert from 'assert';

import { BaseRepo } from '../_Base/BaseRepo';

import { perPage, tableName } from './constants';

export class RoomsRepo extends BaseRepo {
  async save ({ id, name }) {
    // TODO:
    // ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
    const { rows, rowCount } = await this._query(
      `INSERT INTO ${tableName} (id, name) VALUES ($1, $2) RETURNING *`,
      [ id, name ]
    );
    assert(rowCount === 1, 'unexpected affected rooms count');
    return rows[0];
  }

  static perPage = perPage;
}
