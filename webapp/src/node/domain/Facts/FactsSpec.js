import { BaseSpec } from '../_Base/BaseSpec';

import { tableName } from './constants';

export class FactsSpec extends BaseSpec {
  static byRoom({ roomId, lastActionId = null }) {
    const spec = new FactsSpec();

    const values = [ roomId ];
    let where = 'ref = $1';

    if (lastActionId !== null) {
      values.push(lastActionId);
      where = where + ' AND id > $2';
    }

    spec._sql = {
      text: 'SELECT * FROM ' + tableName + ' WHERE ' + where + ' ORDER BY ts',
      values,
    };

    return spec;
  }
}
