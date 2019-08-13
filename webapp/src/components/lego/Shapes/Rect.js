import React from 'react';

export const Rect = ({ className, color }) => {
  const style = {
    fill: color,
    stroke: color,
    transition: 'fill 0.25s ease 0s, stroke 0.25s ease 0s',

    strokeWidth: 8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  return (
    <svg viewBox="-5 -5 310 310" className={className}>
      <rect width="300" height="300" style={style} />
    </svg>
  );
};
