import * as React from 'react';

import './NotFoundPage.css';

export const NotFoundPage = ({ location, staticContext }) => {
  if (staticContext) {
    staticContext.response = { status: 404 };
  }

  return (
    <div className="page__not-found">
      <h1>404 &ndash; Page Not Found</h1>
      <small>path: {location.pathname}</small>
    </div>
  );
};
