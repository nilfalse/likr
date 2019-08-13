import { createEpicMiddleware } from 'redux-observable';

import { reducer as session } from '~/ducks/session';
import { DIE, rootEpic } from '~/node/rx/epics';
import { configureStore } from '~/store';

const loggingMiddleware = logger => store => next => action => {
  if (action.type !== DIE) {
    const { type, ...rest } = action;
    const keys = Object.keys(rest);
    const loggable = (keys.length === 1
      && keys[0].toLowerCase() === 'payload'
      && typeof rest[keys[0]] === 'object'
    ) ? rest[keys[0]] : rest;
    logger.debug(loggable, type);
  }
  return next(action);
};

export class Relay {
  constructor ({ logger, cookies, send }) {
    const epicMiddleware = createEpicMiddleware({
      dependencies: {
        logger,
        send (jsonObj) {
          return send(JSON.stringify(jsonObj)).then(() => jsonObj);
        },
      },
    });

    this.store = configureStore({
      reducers: { session },
      middlewares: [ epicMiddleware, loggingMiddleware(logger) ],
    }, {
      session: cookies
    });

    epicMiddleware.run(rootEpic);
  }

  dispatch (action) {
    this.store.dispatch(action);
  }

  dispose () {
    this.dispatch({ type: DIE });
    this.store = null;
  }

  // middleware = ({ getState, dispatch }) => {
  //   let roomId = null;
  //   let lastActionId = null;

  //   const handleNotification = async () => {
  //     if (lastActionId === null) {
  //       dispatch(reset());
  //       const actions = await this.actionsRepo.findByRoomId(roomId);
  //       actions.forEach(action => {
  //         dispatch(action);
  //         lastActionId = action.id;
  //       });
  //       this.connection.send(getState());
  //     } else {
  //       const updates = this.actionsRepo.findForRoomSinceId(roomId, lastActionId);
  //       updates.forEach(action => {
  //         dispatch(action);
  //         this.connection.send(action.body);
  //         lastActionId = action.id;
  //       });
  //     }
  //   };

  //   return next => action => {
  //     action = stripIntent(action);

  //     let itShouldPersist = false;
  //     let after = null;

  //     switch (action.type) {
  //     case CREATE:
  //       itShouldPersist = true;
  //       action.payload.id = v4();
  //       after = () => {
  //         this.connection.send(action);
  //       };
  //       break;
  //     case JOIN:
  //       roomId = action.payload.id;
  //       lastActionId = null;
  //       // this._listen(this.roomNotifier, 'room:' + roomId, handleNotification);
  //       break;
  //     case LEAVE:
  //       action.payload.id = roomId;
  //       break;
  //     }

  //     if (roomId) {
  //       // this.actionsRepo.save({ rid: roomId, body: action })
  //       //   .then(after);
  //     }

  //     return next(action);
  //   }
  // }
}
