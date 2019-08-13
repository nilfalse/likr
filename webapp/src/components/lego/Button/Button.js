import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

export const Button = ({ to, className, children }) => {
  return (
    <Link to={to} className={"button " + className}>
      {children}
    </Link>
  );
};
