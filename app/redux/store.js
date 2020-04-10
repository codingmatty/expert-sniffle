import { applyMiddleware, compose, createStore } from 'redux';
// import thunkMiddleware from 'redux-thunk'

import reducers from './reducers';

export default function configureStore() {
  // const middlewares = [thunkMiddleware]
  // const middlewareEnhancer = applyMiddleware(...middlewares)

  return createStore(
    reducers,
    window.localStorage
    // , middlewareEnhancer
  );
}
