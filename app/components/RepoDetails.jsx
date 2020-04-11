import React from 'react';
import { Link } from '@reach/router';

export default function RepoDetails({
  private: privateRepo,
  id,
  name,
  full_name,
  description,
  stargazers_count,
  has_issues,
  open_issues_count,
  html_url,
}) {
  return (
    <div>
      {privateRepo && <i className="material-icons">lock</i>}
      <p>
        <Link to={`/repo/${id}/issues`}>{name}</Link>
      </p>
      <div>
        <a href={html_url}>Github</a>
      </div>
      <p>{full_name}</p>
      <p>{description}</p>
      <div>
        <i className="material-icons">star</i>
        {stargazers_count}
        <i className="material-icons">error_outline</i>
        {open_issues_count}
      </div>
    </div>
  );
}
