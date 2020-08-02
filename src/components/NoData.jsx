import React from 'react';
import { Typography } from '@material-ui/core';

export let NoData = ({ title = 'No results found.', desc }) => {
  return (
    <div css={`
      max-width: 720px;
      padding: 8px;
    `}>
      <Typography variant="h6">{title}</Typography>
      {!!desc && <Typography>{desc}</Typography>}
    </div>
  );
};
