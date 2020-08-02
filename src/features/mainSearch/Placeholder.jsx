import React from 'react';

export let Placeholder = props => (
  <div {...props} css={`
    min-height: 300px;
    display: flex;
    & > *:only-child {
      margin: auto;
    }
  `} />
);
