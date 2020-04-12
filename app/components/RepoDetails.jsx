import React from 'react';
import { navigate } from '@reach/router';

import Icon from 'components/Icon';

import './RepoDetails.scss';

export default function RepoDetails({ repo, selected }) {
  const {
    id,
    name,
    full_name,
    description,
    stargazers_count,
    open_issues_count,
    html_url,
  } = repo;

  return (
    <div
      onClick={() => navigate(`/repo/${id}/issues`)}
      className={`repo-details pointer space-between mt-4 border border-gray radius-3 p-4 bg-white ${
        selected ? 'selected' : ''
      }`}
      data-testid="repo-details"
    >
      <div className="info">
        <div className="text-large">
          <b>{name}</b>
          {repo.private && <Icon name="lock" />}
        </div>

        <div>
          <a href={html_url} target="_blank">
            {full_name} <Icon name="open_in_new" />
          </a>
        </div>
      </div>
      <div className="star-count flex items-center text-large">
        <Icon name="star" className="mr-2" />
        {stargazers_count}
      </div>
      <div className="issue-count flex items-center text-large">
        <Icon name="error_outline" className="mr-2" />
        {open_issues_count}
      </div>
      <p className="mt-4 description">{description}</p>
    </div>
  );
}
