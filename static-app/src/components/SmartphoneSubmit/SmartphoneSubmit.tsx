import React, { FC } from 'react';

import { Checkmark } from '../Checkmark';
import { Smartphone } from '../Smartphone';
import { Spinner } from '../Spinner';

import { Warning } from './Warning';

export interface SmartphoneSubmitProps {
  status: null | 'request' | 'success' | 'failure';
  email: null | string;
  className?: string;
}

export const SmartphoneSubmit: FC<SmartphoneSubmitProps> = ({
  children,
  className,
  email,
  status,
}) => {
  const classNames = ['smartphone-submit'];
  if (status === null) {
    classNames.push('smartphone-submit_hidden');
  }
  if (className) {
    classNames.push(className);
  }

  return (
    <div className={classNames.join(' ')}>
      <Smartphone className="smartphone-submit__smartphone">
        <div className="smartphone-submit__content">
          {status === 'request' ? <Spinner /> : null}
          {status === 'success' ? <Checkmark /> : null}
          {status === 'failure' ? <Warning /> : null}
          {email ? <small>{email}</small> : null}
          {children}
        </div>
      </Smartphone>
    </div>
  );
};
