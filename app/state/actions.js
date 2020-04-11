export function setGithubToken(token) {
  window.localStorage.setItem('token', action.token);
  return {
    type: 'SET_GITHUB_TOKEN',
    token,
  };
}

export function loadGithubRepos() {
  return async (dispatch, getState) => {
    dispatch({ type: 'LOADING_GITHUB_REPOS' });
    const { token } = getState();
    const response = await fetch('https://api.github.com/user/repos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const payload = await response.json();
    if (response.status !== 200) {
      dispatch({
        type: 'SET_GITHUB_REPO_ERROR',
        message: payload.message,
      });
      return;
    }
    dispatch({
      type: 'SET_GITHUB_REPOS',
      repos: payload,
    });
  };
}

export function loadGithubIssues(repoId) {
  return async (dispatch, getState) => {
    dispatch({ type: 'LOADING_GITHUB_ISSUES' });
    const { repos: repoCheck } = getState();
    if (repoCheck.data.length === 0) {
      await dispatch(loadGithubRepos());
    }

    const { token, repos } = getState();
    const repo = repos.data.find(({ id }) => id == repoId);
    if (repo) {
      const response = await fetch(
        `https://api.github.com/repos/${repo.full_name}/issues`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const payload = await response.json();
      if (response.status !== 200) {
        dispatch({
          type: 'SET_GITHUB_ISSUE_ERROR',
          message: payload.message,
        });
        return;
      }
      const orderedIssueIds = window.localStorage.getItem(repoId) || [];
      const issues = payload
        .map((issue) => {
          const sortedIndex = orderedIssueIds.indexOf(issue.id);
          return {
            ...issue,
            sortedIndex,
            newIssue: sortedIndex < 0,
          };
        })
        .sort(
          (
            { sortedIndex: firstSortedIndex },
            { sortedIndex: secondSortedIndex }
          ) => firstSortedIndex - secondSortedIndex
        );
      dispatch({
        type: 'SET_GITHUB_ISSUES',
        issues,
        repoId: repo.id,
      });
    } else {
      dispatch({
        type: 'SET_GITHUB_ISSUE_ERROR',
        message: `Unable to find data for repo ${repoId}`,
      });
    }
  };
}

export function reorderGithubIssues(repoId, issues) {
  window.localStorage.setItem(
    repoId,
    issues.map(({ id }) => id)
  );
  return {
    type: 'REORDER_GITHUB_ISSUES',
    issues,
    repoId,
  };
}
