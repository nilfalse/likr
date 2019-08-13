import * as React from 'react';

import { Input } from '~/components/lego/Input';
import { Circle, Heart, Rect, Rhombus, Star } from '~/components/lego/Shapes';
import { colorNames, getLightness, rainbow, toHexString } from '~/universal/colors';
import { getRandomInt } from '~/universal/util';

import './RoomCreateForm.css';

export class RoomCreateForm extends React.Component {
  state = {
    newRoomName: this.props.initialRoomName || '',
    selectedColor: null,
    selectedColorStr: null,
    selectedShape: 'rhombus',
  };

  async componentDidMount () {
    const { getRandomName } = await import('~/universal/lingvo');

    if (this.state.newRoomName === '') {
      const colorIndex = getRandomInt(rainbow.length - 1);

      this.setState({
        newRoomName: getRandomName(),
        selectedColor: rainbow[colorIndex],
        selectedColorStr: toHexString(rainbow[colorIndex]),
      });
    }
  }

  render () {
    return (
      <form onSubmit={this._handleSubmit} className="room-create">
        <div className="room-create__box">
          <Input
            autoFocus
            placeholder="Enter name for the new room here"
            value={this.state.newRoomName}
            onChange={this._handleNameChange}
          />
        </div>
        <FormColors
          className="room-create__color-list"
          colors={rainbow}
          selected={this.state.selectedColor}
          onChange={this._handleColorChange}
        />
        <fieldset className="room-create__shape-list">
          <legend>Choose a shape</legend>
          <Rhombus className="room-create__shape-item" color={this.state.selectedColorStr} />
          <Circle className="room-create__shape-item" color={this.state.selectedColorStr} />
          <Heart className="room-create__shape-item" color={this.state.selectedColorStr} />
          <Star className="room-create__shape-item" color={this.state.selectedColorStr} />
          <Rect className="room-create__shape-item" color={this.state.selectedColorStr} />
        </fieldset>
        <div className="room-create__submit">
          <button type="submit" disabled={!this.state.newRoomName} tabIndex="-1" className="room-create__button ripple">Create new room</button>
        </div>
      </form>
    );
  }

  _handleNameChange = (evt) => {
    this.setState({ newRoomName: evt.target.value });
  }

  _handleColorChange = (evt) => {
    const color = parseInt(evt.target.value, 10);
    this.setState({
      selectedColor: color,
      selectedColorStr: toHexString(color),
    });
  }

  _handleSubmit = (evt) => {
    // TODO: https://medium.com/p/ac066c48bd4f
    evt.preventDefault();
    this.props.createRoom({ name: this.state.newRoomName });
  }
}

export const FormColors = ({ className, colors, onChange, selected }) => {
  return (
    <fieldset className={className}>
      <legend>Choose a color</legend>
      {colors.map((color) => (
        <label
          key={color}
          className={[
            'form-colors__item-wrap',
            selected === color
              ? 'form-colors__item-wrap_selected'
              : '',
            getLightness(color) > 75
              ? 'form-colors__item-wrap_light'
              : 'form-colors__item-wrap_dark',
            'ripple',
          ].join(' ')}
        >
          <input type="radio" name="color" value={color} onChange={onChange} checked={selected === color} />
          <div className="form-colors__item" style={{ backgroundColor: toHexString(color) }}>
            <span className="form-colors__item-label">
              {colorNames[toHexString(color)]}
            </span>
          </div>
        </label>
      ))}
    </fieldset>
  );
};
