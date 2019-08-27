import React, { FC, ReactNode } from 'react';

interface SmartphoneProps {
  top?: ReactNode;
  className?: string;
}

export const Smartphone: FC<SmartphoneProps> = ({ children, className, top }) => {
  const classNames = ['smartphone'];
  if (className) {
    classNames.push(className);
  }

  return (
    <div className={classNames.join(' ')}>
      <div className="smartphone__screen">
        <div className="smartphone__top">{top}</div>
        <div className="smartphone__content">{children}</div>
      </div>
      <div className="smartphone__frame"></div>
    </div>
  );
};

Smartphone.defaultProps = {
  top: null,
};
