import React from 'react';
import { SearchBar } from '../../components/SearchBar';

export let MainSearch = () => {

  return (
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
  );
};
