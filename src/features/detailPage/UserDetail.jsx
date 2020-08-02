import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
} from '@material-ui/core';
import { userDetailThunk } from './slice';
import { UserCard } from './UserCard';
import { UserRepoCard } from './UserRepoCard';
import { UserFollowersCard } from './UserFollowersCard';
import { UserFollowingsCard } from './UserFollowingsCard';
import { NoData } from '../../components/NoData';

let FlexWrap = styled.div`
  flex: 1;
  margin: -16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  & > div {
    padding: 16px;
  }
`;

let UserDetail = () => {
  let { username } = useParams();
  let dispatch = useDispatch();
  let { loadingUserDetail, loadUserDetailError } = useSelector(state => state.detailPage);

  React.useLayoutEffect(() => {
    dispatch(userDetailThunk(username));
  }, [dispatch, username]);

  if (!loadingUserDetail && loadUserDetailError) return (
    <NoData
      title="An error has occurred"
      desc="Maybe GitHub API rate limit is exceeded, please try again later."
    />
  );

  return (
    <FlexWrap>
      <div css="flex-shrink: 0">
        <UserCard />
      </div>
      <div css="flex: 1">
        <FlexWrap>
          <UserRepoCard />
          <UserFollowersCard />
          <UserFollowingsCard />
        </FlexWrap>
      </div>
    </FlexWrap>
  );
};

export default UserDetail;
