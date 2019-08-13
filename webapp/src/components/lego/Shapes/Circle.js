import React from 'react';

export const Circle = ({ className, color }) => {
  const style = {
    fill: color,
    transition: 'fill 0.25s ease 0s, stroke 0.25s ease 0s',
  };

  return (
    <svg viewBox="0 0 100 100" className={className}>
      <circle cx="50" cy="50" r="50" style={style} />
    </svg>
  );
};
