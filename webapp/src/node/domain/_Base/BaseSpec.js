export class BaseSpec {
    constructor () {
      this._sql = null;
    }

    specified () {
      throw new Error('not implemented');
    }
  
    toSql () {
      if (this._sql) {
        return this._sql;
      } else {
        throw new Error('not implemented');
      }
    } 
}
