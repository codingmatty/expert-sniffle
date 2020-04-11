import React from 'react';

import ReposList from 'components/ReposList';
import IssuesList from 'components/IssuesList';

import './IssuesPage.scss';

export default function IssuesPage({ repoId }) {
  return (
    <div className="issues-page flex direction-row mx-4 medium:mx-auto">
      <ReposList selectedRepoId={repoId} />
      <IssuesList selectedRepoId={repoId} />
    </div>
  );
}
