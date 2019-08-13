import * as React from 'react';
import { Link } from 'react-router-dom';

import './RoomList.css';

const Room = ({ room, disabled }) => (
  <li>
    <Link to={'/rooms/' + room.id} className={
      'room-card' + (disabled ? ' room-card_disabled' : '')
    }>
      {room.name}
    </Link>
  </li>
);

export class RoomList extends React.Component {
  state = {
    name: '',
  }

  componentDidMount () {
    this.props.listRooms({ page: 1 });
  }

  render () {
    const { status, rooms } = this.props;

    if (status === 'idle') {
      return (
        rooms.length === 0
        ? <p className="roomlist roomlist_empty">no rooms</p>
        : <div>
            <ul className="roomlist">
              {rooms
                .map(room => <Room key={room.id} room={room} />)}
            </ul>
          </div>
      );
    } else if (status === 'loading') {
      return <p className="roomlist roomlist_loading">loading rooms</p>;
    } else {
      return null;
    }
  }

  _handleNameChange = (evt) => {
    this.setState({ name: evt.target.value });
  }
};
