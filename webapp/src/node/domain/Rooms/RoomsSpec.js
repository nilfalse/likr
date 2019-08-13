import { BaseSpec } from '../_Base/BaseSpec';

import { perPage, tableName } from './constants';

export class RoomsSpec extends BaseSpec {
  static byId(id) {
    const spec = new RoomsSpec();

    spec._sql = {
      text: 'SELECT * FROM ' + tableName + ' WHERE id = $1 LIMIT 1',
      values: [ id ],
    };

    return spec;
  }

  static latest({ page }) {
    const spec = new RoomsSpec();
    const interval = '2 days';

    const where = `created_at > now() - interval '${interval}'`;
    const offset = Math.max(0, page - 1) * perPage;
    const limit = perPage + 1;

    // TODO: order by
    spec._sql = {
      text: 'SELECT * FROM ' + tableName
        + ' WHERE ' + where
        + (offset > 0 ? ' OFFSET ' + offset : '')
        + ' LIMIT ' + limit
    };

    return spec;
  }
}
