import React from 'react';
import { useSelector } from 'react-redux';
import {
  Typography, Card, CardContent, CardMedia, CircularProgress,
  Link,
} from '@material-ui/core';
import { NoData } from '../../components/NoData';
import { Placeholder } from '../../components/Placeholder';

let userInfoSize = 260;

export let UserCard = () => {
  let { userDetail, loadingUserDetail, loadUserDetailError } = useSelector(state => state.detailPage);

  return (
    <Card css={`
      width: ${userInfoSize}px;
    `}>
      {(() => {
        if (loadingUserDetail) return <Placeholder><CircularProgress /></Placeholder>;
        if (loadUserDetailError || !userDetail) return (
          <Placeholder>
            <NoData
              title="User not found"
            />
          </Placeholder>
        );
        return (
          <React.Fragment>
            <CardMedia
              image={userDetail.avatar_url}
              css={`height: ${userInfoSize}px`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5">
                <Link color="inherit" underline="none" href={userDetail.html_url} target="_blank">{userDetail.login}</Link>
              </Typography>
              {!!userDetail.name && (
                <Typography gutterBottom color="textSecondary">
                  {userDetail.name}
                </Typography>
              )}
              {!!userDetail.bio && (
                <Typography variant="body2">
                  {userDetail.bio}
                </Typography>
              )}
            </CardContent>
          </React.Fragment>
        );
      })()}
    </Card>
  );
};
