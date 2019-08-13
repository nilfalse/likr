import { MigrationBuilder } from 'node-pg-migrate';

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable('rooms', {
    id: {
      type: 'uuid',
      primaryKey: true,
    },
    name: {
      type: 'varchar(100)',
      notNull: true,
    },
    created_at: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: 'timestamp with time zone',
  });

  pgm.createTrigger('rooms', 'set_updated_at', {
    when: 'BEFORE',
    operation: 'UPDATE',
    level: 'ROW',

    replace: true,
    returns: 'TRIGGER',
    language: 'plpgsql',
  }, `
  BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END;
  `);
};
