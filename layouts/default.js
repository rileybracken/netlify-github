import React from 'react';
import Helmet from 'react-helmet';

export default ({ children }) => (
  <div>
    <Helmet title="Rimeto" />

    { children }
  </div>
);
