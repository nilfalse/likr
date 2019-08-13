import * as React from 'react';

export class Auth extends React.Component {
  _join = () => {
    this.props.join({ id: 'abc' });
  }

  render () {
    return (
      <div className="login">
        <div>
          <button onClick={this._join}>Log in</button>
        </div>
      </div>
    );
  }
}
