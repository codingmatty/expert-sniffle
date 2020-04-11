import { combineReducers } from 'redux';

function token(state = '', action) {
  switch (action.type) {
    case 'SET_GITHUB_TOKEN':
      return action.token;
    default:
      return state;
  }
}

function repos(
  state = {
    loading: false,
    data: [],
  },
  action
) {
  switch (action.type) {
    case 'LOADING_GITHUB_REPOS':
      return {
        loading: true,
        data: state.data,
      };
    case 'SET_GITHUB_REPO_ERROR':
      return {
        loading: false,
        data: [],
        error: action.message
      };
    case 'SET_GITHUB_REPOS':
      return {
        loading: false,
        data: action.repos,
      };
    default:
      return state;
  }
}

function issues(
  state = {
    loading: false,
    data: [],
  },
  action
) {
  switch (action.type) {
    case 'LOADING_GITHUB_ISSUES':
      return {
        loading: true,
        data: state.data,
      };
    case 'SET_GITHUB_ISSUE_ERROR':
      return {
        loading: false,
        data: [],
        error: action.message
      };
    case 'SET_GITHUB_ISSUES':
    case 'REORDER_GITHUB_ISSUES':
      return {
        loading: false,
        data: action.issues,
      };
    default:
      return state;
  }
}

export default combineReducers({
  token,
  repos,
  issues,
});
