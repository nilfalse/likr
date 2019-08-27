import React, { FC } from 'react';

interface ContainerProps {
  presentation?: string;
  mode?: 'split';
  className?: string;
}

interface SplitProps {
  size?: 'half';
  className?: string;
}

export const Container: FC<ContainerProps> = ({ presentation, mode, className, ...props }) => {
  const classNames = ['container'];
  if (mode) {
    classNames.push(`container_${mode}`);
  }
  if (className) {
    classNames.push(className);
  }

  return React.createElement(presentation!, { className: classNames.join(' '), ...props });
};

Container.defaultProps = {
  presentation: 'div',
};

export const Split: FC<SplitProps> = ({ size, className, children }) => {
  const classNames = ['container__split', `container__split_${size}`];
  if (className) {
    classNames.push(className);
  }

  return <div className={classNames.join(' ')}>{children}</div>;
};

Split.defaultProps = {
  size: 'half',
};
