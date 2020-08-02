import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
  Typography, Card, CardContent, CircularProgress, CardHeader,
  Button, List, ListItem, ListItemAvatar, Avatar, ListItemText,
} from '@material-ui/core';
import { NoData } from '../../components/NoData';
import { getUserFollowersThunk } from './slice';
import { Placeholder } from '../../components/Placeholder';

export let UserFollowersCard = () => {
  let {
    userFollowers, loadingUserFollowers, loadUserFollowersError, userFollowersPage, hasMoreFollowers
  } = useSelector(state => state.detailPage);
  let { username } = useParams();
  let dispatch = useDispatch();
  let history = useHistory();

  return (
    <div css={`
      flex: 1 1 50%;
      min-width: 300px;
      & > div:only-child {
        height: 100%;
      }
    `}>
      <Card>
        <CardHeader
          title={
            <div css="display: flex; justify-content: space-between;">
              <Typography variant="h5">Followers</Typography>
              <div>
                <Button
                  disabled={userFollowersPage <= 1}
                  onClick={e => dispatch(getUserFollowersThunk(username, userFollowersPage - 1))}
                >Previous</Button>
                <Button
                  disabled={!hasMoreFollowers}
                  onClick={e => dispatch(getUserFollowersThunk(username, userFollowersPage + 1))}
                >Next</Button>
              </div>
            </div>
          }
        />
        {(() => {
          if (loadingUserFollowers) return <Placeholder><CircularProgress /></Placeholder>;
          if (loadUserFollowersError || !userFollowers.length) return (
            <Placeholder>
              <NoData title="" desc={`${username} has no followers`} />
            </Placeholder>
          );
          return (
            <React.Fragment>
              <CardContent>
                <List css="margin: 0 -16px" disablePadding>
                  {userFollowers.map(user => {
                    return (
                      <ListItem key={user.id} button onClick={e => history.push(`/u/${user.login}`)}>
                        <ListItemAvatar>
                          <Avatar src={user.avatar_url} />
                        </ListItemAvatar>
                        <ListItemText primary={user.login} />
                      </ListItem>
                    );
                  })}
                </List>
              </CardContent>
            </React.Fragment>
          );
        })()}
      </Card>
    </div>
  );
};
