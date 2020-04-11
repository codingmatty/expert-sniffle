import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux'
import { Router } from "@reach/router"

import './App.scss';

import configureStore from 'state/store'
import TokenInputPage from 'pages/TokenInputPage';
import ReposPage from 'pages/ReposPage';
import IssuesPage from 'pages/IssuesPage';

export function App() {
  return (
    <Provider store={configureStore()}>
      <Router>
        <TokenInputPage path="/" />
        <ReposPage path="repos" />
        <IssuesPage path="repo/:repoId/issues" />
      </Router>
    </Provider>
  );
}

export default hot(module)(App);
