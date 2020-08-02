import React from 'react';
import { FormControlLabel, AppBar, Toolbar, Switch } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../features/theme/slice';

export let TopBar = ({ children }) => {
  let { darkMode } = useSelector(state => state.theme);
  let dispatch = useDispatch();

  return (
    <React.Fragment>
      <AppBar color="inherit">
        <Toolbar variant="dense" disableGutters>
          <div css={`
            margin: auto;
            max-width: 1440px;
            flex: 1;
            padding: 0 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}>
            {children}
            <FormControlLabel
              labelPlacement="start"
              control={
                <Switch
                  checked={darkMode}
                  onChange={e => dispatch(toggleDarkMode())}
                  color="default"
                />
              }
              label="Dark mode"
              css={`
                .MuiFormControlLabel-label {
                  line-height: 1;
                }
              `}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar variant="dense" />
    </React.Fragment>
  );
};
