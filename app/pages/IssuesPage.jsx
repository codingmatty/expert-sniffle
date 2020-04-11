import React, { useState } from 'react';

import ReposList from 'components/ReposList';
import IssuesList from 'components/IssuesList';

export default function IssuesPage({ repoId }) {
  return (
    <div className="flex direction-row">
      <ReposList selectedRepoId={repoId} />
      <IssuesList selectedRepoId={repoId} />
    </div>
  );
}
