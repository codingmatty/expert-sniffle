import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from '@reach/router';

import { loadGithubRepos } from 'state/actions';

import RepoDetails from './RepoDetails';

export default function ReposList({ selectedRepoId }) {
  const dispatch = useDispatch();
  const { loading, error, data: repos } = useSelector(({ repos }) => repos);
  const [fetchTime, setFetchTime] = useState(Date.now());

  useEffect(() => {
    dispatch(loadGithubRepos());
  }, [fetchTime]);

  return (
    <div className="repos-list grow-1">
      <div className="flex direction-row space-between items-center mb-2">
        <div className="flex direction-column">
          <h2 className="mb-2">Repos</h2>
          <Link to="/">Update Token</Link>
        </div>
        <button onClick={() => setFetchTime(Date.now())}>Reload Repos</button>
      </div>

      <ul>
        {loading ? (
          <p>Loading...</p>
        ) : repos.length === 0 ? (
          <p>{error || 'No Repos Found for provided token'}</p>
        ) : (
          repos
            .sort(({ id }) => (id == selectedRepoId ? -1 : 0))
            .map((repo) => (
              <li key={repo.id}>
                <RepoDetails repo={repo} selected={repo.id == selectedRepoId} />
              </li>
            ))
        )}
      </ul>
    </div>
  );
}
