import React from 'react';

export const Rhombus = ({ className, color }) => {
  const style = {
    fill: color,
    transition: 'fill 0.25s ease 0s, stroke 0.25s ease 0s',
  };

  return (
    <svg viewBox="0 0 512 512" className={className}>
      <path
        d="M500.426,271.4c8.378-8.378,8.378-22.088,0-30.466L269.543,10.051c-7.54-7.54-19.879-7.54-27.419,0
          L9.718,242.457c-7.54,7.54-7.54,19.879,0,27.419L240.6,500.759c8.378,8.378,22.088,8.378,30.466,0L500.426,271.4z"
        style={style}
      />
    </svg>
  );
};
