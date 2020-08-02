import { Route, Switch } from 'react-router-dom';
import React from 'react';
import './App.css';
import { MainSearch } from './features/mainSearch/MainSearch';
import { UserList } from './features/mainSearch/UserList';
import MainLayout from './components/MainLayout';
import { TopBar } from './components/TopBar';
import { SearchBar } from './components/SearchBar';
import { UserDetail } from './features/detailPage/UserDetail';

function App() {
  return (
    <MainLayout>
      <Switch>
        <Route exact path="/">
          <MainSearch />
        </Route>
        <Route>
          <div css="margin: 0 auto">
            <TopBar>
              <SearchBar />
            </TopBar>
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
    </MainLayout>
  );
}

export default App;
