import React from 'react';
import { hot } from 'react-hot-loader';
import './App.scss';

export function App() {
  return (
    <div className="app">
      <h1> Hello, World! </h1>
    </div>
  );
}

export default hot(module)(App);
