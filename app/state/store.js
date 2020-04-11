import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  return createStore(
    reducers,
    {
      token: window.localStorage.getItem('token')
    },
    composeEnhancers(applyMiddleware(thunkMiddleware))
  );
}
