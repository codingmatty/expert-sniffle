import React from 'react';

import ReposList from 'components/ReposList';

import './ReposPage.scss'

export default function ReposPage() {
  return (
    <div className="repos-page flex direction-row mx-4 medium:mx-auto">
      <ReposList />
    </div>
  );
}







