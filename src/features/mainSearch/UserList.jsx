import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction,
  Card, CardContent, CardActions, CardHeader,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { PAGE_SIZE } from '../../app/constants';
import { userSearchThunk } from './slice';
import { AppBarProgress } from '../../components/AppBarProgress';
import { NoData } from '../../components/NoData';

export let UserList = () => {
  let { username, page } = useParams();
  let dispatch = useDispatch();
  let { users, loading, error, total } = useSelector(state => state.mainSearch);
  let history = useHistory();

  let currentPage = parseInt(page) || 1;
  let pageCount = Math.ceil(total / PAGE_SIZE);

  React.useLayoutEffect(() => {
    dispatch(userSearchThunk(username, currentPage));
  }, [dispatch, username, currentPage]);

  return (
    <React.Fragment>
      {loading && <AppBarProgress />}
      {(() => {
        if (loading) return;
        if (error) return (
          <NoData
            title="An error has occurred"
            desc="Maybe GitHub API rate limit is exceeded, please try again later."
          />
        );
        if (!users.length) return (
          <NoData
            desc="Your search returned no results. Try shortening or rephrasing your search."
          />
        );
      })()}
      {!!users.length && (
        <Card css={`
          max-width: 720px;
        `}>
          <CardHeader
            title="GitHub Users"
          />
          <CardContent>
            <List css="margin: 0 -16px" disablePadding>
              {users.map(user => {
                return (
                  <ListItem key={user.id} button onClick={e => history.push(`/u/${user.login}`)}>
                    <ListItemAvatar>
                      <Avatar src={user.avatar_url} />
                    </ListItemAvatar>
                    <ListItemText primary={user.login} />
                    <ListItemSecondaryAction>
                      
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          </CardContent>
          <CardActions>
            {pageCount > 1 && (
              <Pagination
                count={pageCount}
                page={currentPage}
                onChange={(e, p) => history.push(`/q/${username}/${p}`)}
                color="primary"
                css={`
                  margin: 0 auto 16px auto;
                `}
              />
            )}
          </CardActions>
        </Card>
      )}
    </React.Fragment>
  );
};
