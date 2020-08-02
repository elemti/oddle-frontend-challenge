import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { UserList } from './UserList';
import { TopBar } from './TopBar';
import { UserDetail } from './UserDetail';

export let MainSearch = () => {

  return (
    <Switch>
      <Route exact path="/">
        <div css={`
          padding-bottom: 100px;
          margin: auto;
        `}>
          <SearchBar autoFocus css={`
            margin: auto;
            && .MuiInputBase-input {
              padding: 12px 4px;
            }
          `} />
        </div>
      </Route>
      <Route>
        <div css="margin: 0 auto">
          <TopBar />
          <div css={`
            padding: 24px 8px;
          `}>
            <Route path="/u/:username">
              <UserDetail />
            </Route>
            <Route path="/q/:username/:page?">
              <UserList />
            </Route>
          </div>
        </div>
      </Route>
    </Switch>
  );
};
