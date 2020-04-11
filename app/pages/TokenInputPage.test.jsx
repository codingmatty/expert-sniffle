import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TokenInputPage from './TokenInputPage';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

describe('TokenInputPage', () => {
  test('sets redux state', () => {
    const testReducer = jest.fn(() => ({ token: '' }));
    render(
      <Provider store={createStore(testReducer)}>
        <TokenInputPage />
      </Provider>
    );
    fireEvent.change(screen.getByTestId('token-input'), {
      target: { value: 'abcdef123456' },
    });
    fireEvent.click(screen.getByText(/save/i));

    expect(testReducer).toHaveBeenCalledWith(
      { token: '' },
      {
        type: 'SET_GITHUB_TOKEN',
        token: 'abcdef123456',
      }
    );
  });
});
