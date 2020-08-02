import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, StylesProvider } from '@material-ui/styles';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';
import './App.css';
import { MainSearch } from './features/mainSearch/MainSearch';
import MainLayout from './components/MainLayout';
import { TopBar } from './components/TopBar';
import { SearchBar } from './components/SearchBar';
import { AppBarProgress } from './components/AppBarProgress';
import { createMuiTheme } from '@material-ui/core/styles';

let UserDetail = React.lazy(() => import('./features/detailPage/UserDetail'));
let UserList = React.lazy(() => import('./features/mainSearch/UserList'));

function App() {
  let {
    darkMode,
    primaryColor,
    textPrimaryColor,
    textSecondaryColor,
    backgroundColor,
  } = useSelector(state => state.theme);
  let theme = createMuiTheme({
    typography: {
      fontFamily: 'inherit',
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: primaryColor,
      },
      text: {
        primary: textPrimaryColor,
        secondary: textSecondaryColor,
      },
      background: {
        default: backgroundColor,
      },
    },
  });
  return (
    <ThemeProvider theme={createMuiTheme(theme)}>
      <StylesProvider injectFirst>
        <CssBaseline />
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
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;
