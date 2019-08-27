import React, { FC, FormEventHandler, useCallback } from 'react';

import { Button } from '../../components/Button';
import { Input, useInput } from '../../components/Input';

interface LaunchSignupFormProps {
  canSubmit: boolean;
  onSubmit: (email: string) => any;
}

function validate(email: string) {
  if (email.length === 0) {
    throw new Error('This can not be empty.');
  }

  const emailParts = email.split('@');
  if (emailParts.length < 2) {
    throw new Error('An email typically has an @ sign.');
  }
  if (emailParts.length > 2) {
    throw new Error('An email typically has only one @ sign.');
  }

  const [beforeAt, afterAt] = emailParts;
  if (afterAt.indexOf('.') < 0) {
    throw new Error('Please enter an email on a public domain.');
  }
}

export const LaunchSignupForm: FC<LaunchSignupFormProps> = ({ canSubmit, onSubmit }) => {
  const [{ info, isValid, reinit }, inputProps] = useInput({ validate });

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    evt => {
      evt.preventDefault();
      const form = evt.currentTarget;
      const email = form.elements.namedItem('email') as HTMLInputElement;

      if (canSubmit && isValid) {
        onSubmit(email.value);
        reinit();
      }
    },
    [canSubmit, isValid, onSubmit],
  );

  return (
    <form className="launch-signup-form" onSubmit={handleSubmit}>
      <Input
        info={info}
        {...inputProps}
        type="email"
        name="email"
        className="launch-signup-form__input"
        placeholder="Enter your email address"
        required
        autoFocus
      />
      <Button theme="cta" disabled={!canSubmit || !isValid}>
        Sign&nbsp;Up
      </Button>
    </form>
  );
};
