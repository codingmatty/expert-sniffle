import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from '@reach/router';

import { setGithubToken } from 'state/actions';

export default function TokenInputPage() {
  const token = useSelector(({ token }) => token);
  const dispatch = useDispatch();
  const [tokenInput, setTokenInput] = useState(token);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(setGithubToken(tokenInput));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={tokenInput}
          onChange={({ target: { value } }) => setTokenInput(value)}
          data-testid="token-input"
        />
        <button type="submit">Save</button>
      </form>
      <div>Token: {token}</div>
      {token && (
        <div>
          <Link to="/repos">Load Repos</Link>
        </div>
      )}
    </div>
  );
}
