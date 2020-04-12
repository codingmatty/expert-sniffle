import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TokenInputPage from './TokenInputPage';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);

describe('TokenInputPage', () => {
  test('sets redux state', () => {
    const store = mockStore({ token: '' })
    const { asFragment } = render(
      <Provider store={store}>
        <TokenInputPage />
      </Provider>
    );
    fireEvent.change(screen.getByTestId('token-input'), {
      target: { value: 'abcdef123456' },
    });
    fireEvent.click(screen.getByText(/submit/i));

    expect(store.getActions()[0]).toEqual(
      {
        type: 'SET_GITHUB_TOKEN',
        token: 'abcdef123456',
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
