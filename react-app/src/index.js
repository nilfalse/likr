import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

import { Socket } from 'phoenix';

function main() {
  let socket = new Socket('ws://localhost:4000/realtime');
  socket.connect();

  let channel = socket.channel('rooms:lobby');

  channel.on('new:todo', msg => console.log('new:todo', msg));
  channel.on('update:todo', msg => console.log('update:todo', msg));

  channel.join()
    .receive('ok', messages => console.log('catching up', messages))
    .receive('error', reason => console.log('failed join', reason))
    // .after(10000, () => console.log('Networking issue. Still waiting...'));

  channel.push('new:todo', { text: 'hello' })
    .receive('ok', response => {
      console.log('created TODO', response);
    })
    .receive('error', error => {
      console.error(error);
    });
  channel.push('update:todo', { text: 'good bye' })
}

main();
