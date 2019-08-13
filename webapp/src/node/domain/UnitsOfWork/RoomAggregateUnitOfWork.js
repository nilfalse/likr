import { l } from '~/node/logger';
import { pool } from '~/node/db';
import { configureStore } from '~/store';

import { selectRoomState } from '~/ducks/room';

import { FactsRepo, FactsSpec } from '../Facts';
import { RoomsRepo, RoomsSpec } from '../Rooms';

export class RoomAggregateUnitOfWork {
  constructor ({ db = pool, logger = l }) {
    this._db = db;
    this._logger = logger;
  }

  async perform (request) {
    const { roomId } = request.payload;

    const client = await this._db.connect();
    try {
      const factsRepo = new FactsRepo({ db: client, logger: this._logger })
      const [ facts ] = await Promise.all([
        factsRepo.query(FactsSpec.byRoom({ roomId })),
        this._confirmRoomExists(roomId, client)
      ]);

      const store = configureStore();
      store.dispatch(request);
      facts.forEach(store.dispatch);
      return selectRoomState(store.getState());
    } finally {
      client.release();
    }
  }

  async _confirmRoomExists (roomId, db) {
    const repo = new RoomsRepo({ db, logger: this._logger });
    const rooms = await repo.query(RoomsSpec.byId(roomId));
    if (rooms.length === 0) {
      throw new RoomNotFoundError();
    }
  }
}

export class RoomNotFoundError extends Error {
  constructor () {
    super('Room not found');
    this.name = 'RoomNotFoundError';
    Error.captureStackTrace(this, RoomNotFoundError);
  }
}
