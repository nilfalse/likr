import { MigrationBuilder } from 'node-pg-migrate';

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable('facts', {
    id: 'id',
    ref: {
      type: 'uuid',
      notNull: true,
    },
    type: {
      type: 'varchar(64)',
      notNull: true,
    },
    payload: {
      type: 'json',
    },
    meta: 'json',
    ts: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
  }, {
    constraints: {
      foreignKeys: {
        columns: 'ref',
        references: 'rooms(id)',
        onDelete: 'CASCADE',
      }
    }
  });

  pgm.createIndex('facts', [ 'ref', 'ts' ]);

  // pgm.createTrigger('facts', 'facts_notify_trigger', {
  //   when: 'BEFORE',
  //   operation: ['INSERT', 'UPDATE'],
  //   level: 'ROW',

  //   replace: true,
  //   returns: 'TRIGGER',
  //   language: 'plpgsql',
  // }, `
  // DECLARE
  // BEGIN
  //   PERFORM pg_notify( 'facts-channel', TG_TABLE_NAME || ',ref:' || NEW.ref );
  //   RETURN new;
  // END;
  // `);
};
