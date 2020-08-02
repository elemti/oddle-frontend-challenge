import { Route, Switch } from 'react-router-dom';
import React from 'react';
import './App.css';
import { MainSearch } from './features/mainSearch/MainSearch';
import MainLayout from './components/MainLayout';
import { TopBar } from './components/TopBar';
import { SearchBar } from './components/SearchBar';
import { AppBarProgress } from './components/AppBarProgress';

let UserDetail = React.lazy(() => import('./features/detailPage/UserDetail'));
let UserList = React.lazy(() => import('./features/mainSearch/UserList'));

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
              <React.Suspense fallback={
                <AppBarProgress />
              }>
                <Route path="/u/:username">
                  <UserDetail />
                </Route>
                <Route path="/q/:username/:page?">
                  <UserList />
                </Route>
              </React.Suspense>
            </div>
          </div>
        </Route>
      </Switch>
    </MainLayout>
  );
}

export default App;
