import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { StylesProvider, ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { PRIMARY_COLOR, TEXT_PRIMARY_COLOR, TEXT_SECONDARY_COLOR } from './constants';
import RootContainer from './components/RootContainer';

export const theme = createMuiTheme({
  typography: {
    fontFamily: 'inherit',
  },
  palette: {
    primary: {
      main: PRIMARY_COLOR,
    },
    text: {
      primary: TEXT_PRIMARY_COLOR,
      secondary: TEXT_SECONDARY_COLOR,
    },
  },
});

function App() {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <RootContainer />
        </BrowserRouter>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
