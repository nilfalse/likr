import React from 'react';

import './Input.css';

export const Input = ({
  placeholder,
  value,
  onChange,
  errorText,
  type,
  name,
  autoFocus,
  className,
}) => {
  const classNames = [ 'input' ];
  if (value) {
    classNames.push('input_non-empty');
  }
  if (errorText) {
    classNames.push('input_error');
  }
  if (className) {
    classNames.push(className);
  }

  return (
    <label className={classNames.join(' ')}>
      <span className="input__label">{placeholder}</span>
      <input type={type} name={name} className="input__control" value={value} onChange={onChange} autoFocus={autoFocus} />
      <span className="input__error">{errorText}</span>
    </label>
  );
};
