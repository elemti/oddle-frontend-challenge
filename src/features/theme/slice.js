import { createSlice } from '@reduxjs/toolkit';
import { invert } from 'polished';

let PRIMARY_COLOR = '#0062ff';
let DARK_PRIMARY_COLOR = '#0ac0d0';
let BACKGROUND_COLOR = '#f0f0f7';
let TEXT_PRIMARY_COLOR = '#2b2b2b';
let TEXT_SECONDARY_COLOR = '#1d212999';
let BORDER_COLOR = '#dbdee8';

let slice = createSlice({
  name: 'theme',
  initialState: {
    darkMode: false,
    primaryColor: PRIMARY_COLOR,
    darkPrimaryColor: DARK_PRIMARY_COLOR,
    backgroundColor: BACKGROUND_COLOR,
    textPrimaryColor: TEXT_PRIMARY_COLOR,
    textSecondaryColor: TEXT_SECONDARY_COLOR,
    borderColor: BORDER_COLOR,
  },
  reducers: {
    toggleDarkMode: (state, { payload }) => {
      state.darkMode = !state.darkMode;
      if (state.darkMode) {
        state.primaryColor = '#85b3ff';
        // state.darkPrimaryColor = PRIMARY_COLOR;
        state.backgroundColor = invert(BACKGROUND_COLOR);
        state.textPrimaryColor = invert(TEXT_PRIMARY_COLOR);
        state.textSecondaryColor = invert(TEXT_SECONDARY_COLOR);
        state.borderColor = invert(BORDER_COLOR);
      } else {
        state.primaryColor = PRIMARY_COLOR;
        state.darkPrimaryColor = DARK_PRIMARY_COLOR;
        state.backgroundColor = BACKGROUND_COLOR;
        state.textPrimaryColor = TEXT_PRIMARY_COLOR;
        state.textSecondaryColor = TEXT_SECONDARY_COLOR;
        state.borderColor = BORDER_COLOR;
      }
    },
  },
});

export let {
  toggleDarkMode,
} = slice.actions;

export default slice;
