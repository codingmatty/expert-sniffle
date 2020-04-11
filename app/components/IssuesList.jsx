import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactSortable } from 'react-sortablejs';
import { Link } from '@reach/router';

import { loadGithubIssues, reorderGithubIssues } from 'state/actions';

import Icon from 'components/Icon';

import IssueDetails from './IssueDetails';

export default function IssuesList({ className, selectedRepoId }) {
  const dispatch = useDispatch();
  const repo = useSelector(({ repos }) =>
    repos.data.find(({ id }) => id == selectedRepoId)
  );
  const { loading, data: issues } = useSelector(({ issues }) => issues);
  const [fetchTime, setFetchTime] = useState(Date.now());

  useEffect(() => {
    dispatch(loadGithubIssues(selectedRepoId));
  }, [selectedRepoId, fetchTime]);

  const reorderIssues = (reorderedIssues) => {
    // This is called on first render with an empty array
    // Don't dispatch reorder action with an empty array.
    if (reorderedIssues.length === 0) {
      return;
    }
    dispatch(reorderGithubIssues(selectedRepoId, reorderedIssues));
  };

  return (
    <div className="issues-list grow-1">
      <Link to="/repos" className="back-to-repos mt-4 flex items-center">
        <Icon name="arrow_back" className="mr-2 decoration-none" />
        Back To Repos
      </Link>
      <div className="flex direction-row space-between items-center">
        <h2>Issues</h2>
        <button onClick={() => setFetchTime(Date.now())}>
          Reload Issues
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : issues.length === 0 ? (
        <p>
          No issues found for {repo ? repo.full_name : selectedRepoId}.
          <br />
          <br />
          Try selecting a different repo.
        </p>
      ) : (
        <>
          <h3>{repo.full_name}</h3>
          <ReactSortable tag="ul" list={issues} setList={reorderIssues}>
            {issues.map((issue) => (
              <li key={issue.id}>
                <IssueDetails {...issue} />
              </li>
            ))}
          </ReactSortable>
        </>
      )}
    </div>
  );
}
