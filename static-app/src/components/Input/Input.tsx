import React, { FC, InputHTMLAttributes } from 'react';

import { InputHookPublicInterface } from './useInput';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  info: string;
  hook: InputHookPublicInterface;
}

export const Input: FC<InputProps> = ({ className, info, placeholder, hook, ...props }) => {
  const classNames = ['input'];
  if (props.required) {
    classNames.push('input_required');
  }
  if (hook.isFocused || props.value) {
    classNames.push('input_active');
  }
  if (hook.isDirty) {
    classNames.push('input_dirty');
  }
  if (hook.mode) {
    classNames.push('input_' + hook.mode);
  }
  if (className) {
    classNames.push(className);
  }

  return (
    <div className={classNames.join(' ')}>
      <label className="input__click-area">
        <input {...props} className="input__form-control" />
        <span className="input__label">{placeholder}</span>
        <span className="input__info">{info}</span>
      </label>
    </div>
  );
};
