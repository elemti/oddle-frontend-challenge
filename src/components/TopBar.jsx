import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';

export let TopBar = ({ children }) => {
  return (
    <React.Fragment>
      <AppBar css="background: white">
        <Toolbar variant="dense" disableGutters>
          <div css={`
            margin: auto;
            max-width: 1440px;
            flex: 1;
            padding: 0 8px;
          `}>
            {children}
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar variant="dense" />
    </React.Fragment>
  );
};
