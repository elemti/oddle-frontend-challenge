import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
  Typography, Card, CardContent, CircularProgress, CardHeader,
  Button, List, ListItem, ListItemAvatar, Avatar, ListItemText,
} from '@material-ui/core';
import { NoData } from '../../components/NoData';
import { Placeholder } from '../../components/Placeholder';
import { getUserFollowingsThunk } from './slice';

export let UserFollowingsCard = () => {
  let {
    userFollowings, loadingUserFollowings, loadUserFollowingsError, userFollowingsPage, hasMoreFollowings
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
              <Typography variant="h5">Following</Typography>
              <div>
                <Button
                  disabled={userFollowingsPage <= 1}
                  onClick={e => dispatch(getUserFollowingsThunk(username, userFollowingsPage - 1))}
                >Previous</Button>
                <Button
                  disabled={!hasMoreFollowings}
                  onClick={e => dispatch(getUserFollowingsThunk(username, userFollowingsPage + 1))}
                >Next</Button>
              </div>
            </div>
          }
        />
        {(() => {
          if (loadingUserFollowings) return <Placeholder><CircularProgress /></Placeholder>;
          if (loadUserFollowingsError || !userFollowings.length) return (
            <Placeholder>
              <NoData title="" desc={`${username} isn't following anyone`} />
            </Placeholder>
          );
          return (
            <React.Fragment>
              <CardContent>
                <List css="margin: 0 -16px" disablePadding>
                  {userFollowings.map(user => {
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
