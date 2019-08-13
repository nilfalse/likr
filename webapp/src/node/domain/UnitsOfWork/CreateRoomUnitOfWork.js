import * as uuid from 'uuid';

import { l } from '~/node/logger';
import { pool } from '~/node/db';

import { FactsRepo, FactsPublisher } from '../Facts';
import { RoomsRepo } from '../Rooms';
import { createRoomActions } from '~/ducks/rooms';

export class CreateRoomUnitOfWork {
  constructor ({ db = pool, logger = l }) {
    this._db = db;
    this._logger = logger;
  }

  async perform (request, context) {
    const roomId = uuid.v4();
    this._logger.trace(context, 'CreateRoomUnitOfWork.perform()');

    const client = await this._db.connect();
    try {
      const rooms = new RoomsRepo({ db: client, logger: this._logger });

      let room = null;
      try {
        room = await rooms.save({ ...request.payload, id: roomId });
      } catch (e) {
        return createRoomActions.failure(e);
      }

      const facts = new FactsRepo({ db: client, logger: this._logger });
      const successAction = createRoomActions.success(room);
      const [ requestFact, successFact ] = await Promise.all([
        facts.save({ ...request, ref: roomId }),
        facts.save({ ...successAction, ref: roomId }),
      ]);

      const factsPub = new FactsPublisher({ bus: client, logger: this._logger });
      await factsPub.publish(roomId);

      return successAction;
    } finally {
      client.release();
    }
  }
}
