import React, { FC } from 'react';

interface CheckmarkProps {
  delay?: number;
}

export const Checkmark: FC<CheckmarkProps> = ({ delay }) => {
  const rootDelays = [400, 900].map(d => String(d + delay!) + 'ms').join(',');
  const circleDelay = String(delay!) + 'ms';
  const checkDelay = String(800 + delay!) + 'ms';

  return (
    <svg className="checkmark" viewBox="0 0 52 52" style={{ animationDelay: rootDelays }}>
      <circle
        className="checkmark__circle"
        cx="26"
        cy="26"
        r="25"
        fill="none"
        style={{ animationDelay: circleDelay }}
      />
      <path
        className="checkmark__check"
        fill="none"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
        style={{ animationDelay: checkDelay }}
      />
    </svg>
  );
};

Checkmark.defaultProps = { delay: 0 };
