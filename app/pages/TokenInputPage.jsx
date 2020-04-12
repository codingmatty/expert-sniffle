import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '@reach/router';

import { setGithubToken } from 'state/actions';

import Icon from 'components/Icon';

import './TokenInputPage.scss';

export default function TokenInputPage() {
  const token = useSelector(({ token }) => token);
  const dispatch = useDispatch();
  const [tokenInput, setTokenInput] = useState(token);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(setGithubToken(tokenInput));
    navigate('/repos');
  };

  return (
    <div className="token-input-page mx-4 medium:mx-auto">
      <div>
        <p className="my-4 text-xlarge">Welcome!</p>
        <p className="my-4">
          Please provide a Github Personal Access Token to continue.
        </p>
        <p className="my-4">
          To obtain an Access Token, login to Github, visit the{' '}
          <a href="https://github.com/settings/tokens" target="_blank">
            Github Tokens <Icon name="open_in_new" />
          </a>
          , and generate a new one, providing a description like "Issue
          Prioritization Project" to describe its use and selecting the{' '}
          <code className="inline">repo</code> scope.
        </p>
        <p className="my-4">
          Once you enter it here, you will then be able to select a Github repo
          to show a list of Issues and prioritize them as needed.
        </p>
      </div>
      <form
        onSubmit={onSubmit}
        className="token-form mx-auto flex direction-column"
      >
        <label html="token-input" className="bold">
          Access Token:
        </label>
        <input
          id="token-input"
          className="mt-4"
          value={tokenInput}
          onChange={({ target: { value } }) => setTokenInput(value)}
          data-testid="token-input"
        />
        <button type="submit" className="mt-4">
          Submit
        </button>
      </form>
    </div>
  );
}
