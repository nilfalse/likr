import React from 'react';

export const Heart = ({ className, color }) => {
  const style = {
    fill: color,
    transition: 'fill 0.25s ease 0s, stroke 0.25s ease 0s',
  };

  return (
    <svg viewBox="0 0 342 314" className={className}>
      <defs>
        <g id="heart">
        <path d="M0 200 v-200 h200 a100,100 90 0,1 0,200 a100,100 90 0,1 -200,0 z" />
        </g>
      </defs>
      <desc>
        a nearly perfect heart
        made of two arcs and a right angle
      </desc>
      <use href="#heart" transform="rotate(225,150,121)" style={style} />
    </svg>
  );
};
