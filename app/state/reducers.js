import { combineReducers } from 'redux';

function token(state = '', action) {
  switch (action.type) {
    case 'SET_GITHUB_TOKEN':
      window.localStorage.setItem('token', action.token);
      return action.token;
    default:
      return state;
  }
}

function repos(state = [], action) {
  switch (action.type) {
    default:
      return state;
  }
}

function issues(state = [], action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default combineReducers({
  token,
  repos,
  issues,
});
