import { Pool, Client } from 'pg';

import { config } from './config';
import { l } from './logger';

export const pool = new Pool({
  connectionString: config.db,
  max: config.maxDatabaseConnections - 1,
});
export const clientFactory = () => new Client({ connectionString: config.db });

// ;(async function(){
//   await client.connect();
//   await client.query(`LISTEN "facts-channel"`);

//   client.on('notification', (_msg) => {
//     const { name, ...msg } = _msg;
//     l.info(msg, name);
//   });

//   const interval = setInterval(() => {
//     client.query(`NOTIFY "facts-channel", 'This is the payload';`);
//   }, 1000);
//   module.hot.dispose(() => {
//     clearInterval(interval);
//     client.end();
//   });
// })();
