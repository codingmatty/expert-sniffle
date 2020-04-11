import React from 'react';
import moment from 'moment';

import './IssueDetails.scss';

export default function IssueDetails({ newIssue, title, created_at, updated_at, user = {} }) {
  return (
    <div className={`issue-details mt-4 border border-gray radius-3 p-4 bg-white ${newIssue ? 'new' : ''}`}>
      <div className="flex space-between">
        <img className="radius-3" src={`${user.avatar_url}&s=40`} height="40" width="40"/>
        <div className="text-small">
          <div>Created: {moment(created_at).format('M/D/YYYY')}</div>
          <div>Last updated {moment(updated_at).fromNow()}</div>
        </div>
      </div>
      <p className="mt-4">{title}</p>
    </div>
  );
}
