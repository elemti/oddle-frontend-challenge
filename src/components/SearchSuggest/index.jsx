import styled from 'styled-components';
import shortid from 'shortid';
import React from 'react';
import pDebounce from 'p-debounce';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Popper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { transparentize } from 'polished';
import { PRIMARY_COLOR, BORDER_COLOR } from '../../app/constants';
import usePromise from '../../utils/usePromise';

let StyledPopper = styled(React.forwardRef((props, ref) => (
  <Popper
    disablePortal
    ref={ref}
    {...props}
  />
)))`
  .MuiAutocomplete-option[aria-selected="true"] {
    background: transparent;
    color: ${PRIMARY_COLOR};
  }
  .MuiAutocomplete-option[data-focus="true"] {
    background: ${transparentize(.9, PRIMARY_COLOR)};
  }
  & > .MuiPaper-root {
    box-shadow: none;
    border: 1px solid ${BORDER_COLOR};
  }
`;

let SmallStyledPopper = styled(StyledPopper)`
  .MuiAutocomplete-option {
    font-size: 12px;
    font-weight: 500;
  }
`;

let SearchSuggest = ({
  hideNoOptions,
  smallSize,
  autoFocus,
  loadOptions = async () => [],
  debounceMs = 250,
  onInputChange,
  placeholder,
  ...props
}) => {
  let ref = React.useRef({});
  ref.current.loadOptions = loadOptions;
  let debouncedLoadOptions = React.useMemo(() => {
    let func = (...args) => ref.current.loadOptions(...args);
    if (debounceMs === 0) return func;
    return pDebounce(func, debounceMs);
  }, [debounceMs]);

  let [
    { value: options, loading },
    execLoadOptions,
  ] = usePromise(debouncedLoadOptions, { value: [] });
  
  return (
    <Autocomplete
      id={'Autocomplete_' + shortid.generate()}
      options={options}
      fullWidth
      getOptionLabel={opt => opt.label || ''}
      loading={loading}
      getOptionSelected={(opt, item) => opt.value === item.value}
      handleHomeEndKeys={false}
      onInputChange={(e, value, reason) => {
        onInputChange && onInputChange(e, value, reason);
        if (reason !== 'reset') execLoadOptions(value);
      }}
      PopperComponent={smallSize ? SmallStyledPopper : StyledPopper}
      filterOptions={opts => opts}
      renderOption={opt => opt.render ? opt.render : opt.label}
      renderInput={(params) => (
        <TextField
          {...params}
          autoFocus={autoFocus}
          margin="none"
          variant="outlined"
          placeholder={placeholder}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <SearchIcon css={`
                flex-shrink: 0;
                margin-right: 8px;
                .Mui-focused > & {
                  color: ${PRIMARY_COLOR};
                }
              `} />
            ),
            // endAdornment: (
            //   <React.Fragment>
            //     {loading ? (
            //       <div className="MuiAutocomplete-endAdornment">
            //         <CircularProgress color="primary" size={16} />
            //       </div>
            //     ) : params.InputProps.endAdornment}
            //   </React.Fragment>
            // ),
          }}
        />
      )}
      css={`
        .MuiAutocomplete-endAdornment {
          top: 50%;
          transform: translateY(-50%);
        }
        .MuiAutocomplete-inputRoot {
          padding-top: 0;
          padding-bottom: 0;
        }
        .MuiAutocomplete-option {
          max-width: 100%;
          overflow: hidden;
        }
        ${smallSize ? `
          .MuiAutocomplete-input {
            font-size: 12px;
            font-weight: 500;
            line-height: 12px;
          }
        ` : ''}
        ${hideNoOptions && !options.length ? `
          & + .MuiAutocomplete-popper {
            visibility: hidden;
          }
        ` : ''}
      `}
      {...props}
    />
  );
};

export default SearchSuggest;
