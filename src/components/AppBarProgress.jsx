import styled from 'styled-components';
import { LinearProgress } from '@material-ui/core';

export let AppBarProgress = styled(LinearProgress)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1200;
  height: 3px;
`;
