import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux'
import configureStore from 'redux/store'
import { Router } from "@reach/router"

import './App.scss';

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
