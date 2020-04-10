import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function TokenInputPage() {
  const token = useSelector(({ token }) => token);
  const dispatch = useDispatch();
  const [tokenInput, setTokenInput] = useState(token);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_GITHUB_TOKEN', token: tokenInput });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={tokenInput}
          onChange={({ target: { value } }) => setTokenInput(value)}
        />
        <button type="submit">Save</button>
      </form>
      <div>Token: {token}</div>
    </div>
  );
}
