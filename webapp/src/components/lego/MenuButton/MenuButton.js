import React, { Component } from 'react';

import './MenuButton.css';

export class MenuButton extends Component {
  state = {
    isActive: false,
  };

  render () {
    const classNames = [ 'hamburger', 'hamburger_spin' ];
    if (this.state.isActive) {
      classNames.push('hamburger_active');
    }

    return (
      <button className={classNames.join(' ')} onClick={this._toggle}>
      <div className="hamburger__wrap">
        <span className="hamburger__inner"></span>
      </div>
    </button>
    );
  }

  _toggle = () => {
    this.setState((prevState) => ({ isActive: !prevState.isActive }));
  }
}
