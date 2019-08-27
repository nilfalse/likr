import { ChangeEventHandler, FocusEventHandler, useCallback, useState } from 'react';

interface InputHookParams {
  validate?: (text: string) => any;
}

export interface InputHookPublicInterface {
  info: string;
  isDirty: boolean;
  isFocused: boolean;
  isValid: boolean;
  mode: 'warn' | 'error' | null;
  reinit: () => void;
  setInfo: (info: string) => any;
}

interface InputHookPassedProps {
  hook: InputHookPublicInterface;
  onBlur: FocusEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onFocus: FocusEventHandler<HTMLInputElement>;
  value: string;
}

type InputHook = (
  params: InputHookParams,
) => readonly [InputHookPublicInterface, InputHookPassedProps];

export const useInput: InputHook = ({ validate } = {}) => {
  const [value, setValue] = useState('');
  const [isValid, setValidity] = useState(false);
  const [isFocused, setFocused] = useState(false);
  const [isDirty, setDirty] = useState(false);

  const [info, setInfo] = useState('');
  const [mode, setMode] = useState<'warn' | 'error' | null>(null);

  const reinit = useCallback(() => {
    setValue('');
    setValidity(false);
    setDirty(false);
    setInfo('');
    setMode(null);
  }, []);

  const onFocus: FocusEventHandler<HTMLInputElement> = useCallback(() => {
    setFocused(true);
  }, []);
  const onBlur: FocusEventHandler<HTMLInputElement> = useCallback(() => {
    setFocused(false);
    if (mode === 'warn') {
      setMode('error');
    }
  }, [mode]);

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    async evt => {
      const { value, validity, validationMessage } = evt.currentTarget;

      setDirty(true);
      setValue(value);

      if (validity) {
        if (validity.valid === false) {
          setValidity(false);
          setMode('warn');
          setInfo(validationMessage);
        } else {
          try {
            const isValid = validate && (await validate(value));
            if (isValid !== undefined) {
              throw new Error(isValid);
            }

            setValidity(true);
            setMode(null);
            setInfo('');
          } catch (err) {
            setValidity(false);
            setMode('warn');
            setInfo(err.message);
          }
        }
      }
    },
    [validate],
  );

  const hook = { info, isDirty, isFocused, isValid, mode, reinit, setInfo };
  return [hook, { hook, onBlur, onChange, onFocus, value }];
};
