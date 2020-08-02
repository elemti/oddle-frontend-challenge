import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Typography, Card, CardContent, Link, CircularProgress, CardHeader,
  Button,
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { NoData } from '../../components/NoData';
import { getUserReposThunk } from './slice';
import { Placeholder } from '../../components/Placeholder';

let RepoItem = ({ repo }) => {
  let { borderColor } = useSelector(state => state.theme);
  return (
    <div css={`
      flex: 1 1 50%;
      min-width: 300px;
      padding: 8px;
    `}>
      <div css={`
        border: 1px solid ${borderColor};
        border-radius: 4px;
        height: 100%;
        padding: 16px;
        display: flex;
        flex-direction: column;
      `}>
        <div css={`
          display: flex;
          align-items: center;
        `}>
          <InboxIcon css="margin-right: 8px; font-size: 20px;" />
          <Typography css="font-weight: 600">
            <Link href={repo.html_url} target="_blank">{repo.name}</Link>
          </Typography>
        </div>
        <Typography css="flex: 1; margin: 8px 0 16px 0">
          {repo.description}
        </Typography>
        <div css={`
          display: flex;
          align-items: center;
          & > * {
            display: flex;
            align-items: center;
            margin-right: 16px;
            & > svg {
              font-size: 16px;
              margin-right: 2px;
            }
          }
        `}>
          {!!repo.language && <div>{repo.language}</div>}
          <Link href={`${repo.html_url}/stargazers`} target="_blank" color="textPrimary" underline="none">
            <StarBorderIcon />
            {repo.stargazers_count}
          </Link>
          <Link href={`${repo.html_url}/network/members`} target="_blank" color="textPrimary" underline="none">
            <DeviceHubIcon css="transform: rotate(180deg)" />
            {repo.forks_count}
          </Link>
        </div>
      </div>
    </div>
  );
};

export let UserRepoCard = () => {
  let { userRepos, loadingUserRepos, loadUserReposError, userReposPage, hasMoreRepos } = useSelector(state => state.detailPage);
  let { username } = useParams();
  let dispatch = useDispatch();

  return (
    <div css={`
      flex: 1 1 100%;
      & > div:only-child {
        height: 100%;
      }
    `}>
      <Card>
        <CardHeader
          title={
            <div css="display: flex; justify-content: space-between;">
              <Typography variant="h5">Repositories</Typography>
              <div>
                <Button
                  disabled={userReposPage <= 1}
                  onClick={e => dispatch(getUserReposThunk(username, userReposPage - 1))}
                >Previous</Button>
                <Button
                  disabled={!hasMoreRepos}
                  onClick={e => dispatch(getUserReposThunk(username, userReposPage + 1))}
                >Next</Button>
              </div>
            </div>
          }
        />
        {(() => {
          if (loadingUserRepos) return <Placeholder><CircularProgress /></Placeholder>;
          if (loadUserReposError || !userRepos.length) return (
            <Placeholder>
              <NoData
                title="Repos not found"
              />
            </Placeholder>
          );
          return (
            <React.Fragment>
              <CardContent css={`
                display: flex;
                flex-wrap: wrap;
              `}>
                {userRepos.map((repo, i) => (
                  <RepoItem key={i} repo={repo} />
                ))}
              </CardContent>
            </React.Fragment>
          );
        })()}
      </Card>
    </div>
  );
};
