import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux'
import { Router } from "@reach/router"

import './App.scss';

import configureStore from 'state/store'
import TokenInputPage from 'components/TokenInputPage';
// import ReposPage from 'components/ReposPage';

export function App() {
  return (
    <Provider store={configureStore()}>
      <Router>
        <TokenInputPage path="/" />
        {/* <ReposPage path="repos" /> */}
      </Router>
    </Provider>
  );
}

export default hot(module)(App);
