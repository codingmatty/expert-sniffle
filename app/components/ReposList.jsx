import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
    <div className="mx-auto w-half">
      <div className="flex direction-row space-between items-center">
        <h2>Repos</h2>
        <button className="mr-4" onClick={() => setFetchTime(Date.now())}>
          Reload Repos
        </button>
      </div>

      <ul>
        {loading ? (
          <p>Loading...</p>
        ) : repos.length === 0 ? (
          <p>{error || 'No Repos Found for provided token'}</p>
        ) : (
          repos.map((repo) => (
            <li key={repo.id}>
              <RepoDetails {...repo} selected={repo.id === selectedRepoId} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
