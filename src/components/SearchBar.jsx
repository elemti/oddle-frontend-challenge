import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import SearchSuggest from './SearchSuggest';
import { fetchUsers } from '../features/mainSearch/api';

export let SearchBar = ({ autoFocus, ...props }) => {
  let [inputVal, setInputVal] = React.useState('');
  let searchText = useSelector(state => state.mainSearch.searchText);
  let history = useHistory();
  let submitSearch = () => {
    if (!inputVal) return;
    history.push(`/q/${inputVal}`);
  };

  React.useEffect(() => {
    setInputVal(searchText);
  }, [searchText]);

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        submitSearch();
      }}
      css={`
        width: 100%;
        max-width: 582px;
        background: white;
      `}
      {...props}
    >
      <SearchSuggest
        autoFocus={autoFocus}
        inputValue={inputVal}
        onInputChange={(e, val, reason) => {
          if (reason === 'reset') return;
          setInputVal(val);
        }}
        placeholder="Search GitHub users"
        freeSolo
        onChange={(e, opt, reason) => {
          if (reason !== 'select-option') return;
          if (opt.value === 'SEARCH_CURRENT') return submitSearch();
          history.push(`/u/${opt.login}`);
        }}
        hideNoOptions
        loadOptions={async text => {
          if (!text) return [];
          let [{ items }, err] = await fetchUsers({ username: text });
          if (err) throw err;
          return [
            ...items.map(it => ({ ...it, label: it.login, value: it.id })),
            {
              value: 'SEARCH_CURRENT',
              label: text,
              render: (
                <Typography color="primary" noWrap>
                  Search for <span css="font-weight: 600">{text}</span>
                </Typography>
              ),
            },
          ];
        }}
        css={`
          width: 100%;
        `}
      />
    </form>
  );
};
