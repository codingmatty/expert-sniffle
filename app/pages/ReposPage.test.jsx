import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import React from 'react';
import { render, screen } from '@testing-library/react';
import ReposPage from './ReposPage';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);

describe('ReposPage', () => {
  describe('loading', () => {
    test('shows loading message', () => {
      render(
        <Provider store={mockStore({ repos: { loading: true } })}>
          <ReposPage />
        </Provider>
      );
      expect(screen.getByText('Loading...')).toBeDefined();
    });
  });

  describe('error', () => {
    test('shows error message', () => {
      const { asFragment } = render(
        <Provider
          store={mockStore({ repos: { error: 'An error occurred', data: [] } })}
        >
          <ReposPage />
        </Provider>
      );
      expect(screen.getByText('An error occurred')).toBeDefined();
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('with data', () => {
    test('empty array', () => {
      const { asFragment } = render(
        <Provider store={mockStore({ repos: { data: [] } })}>
          <ReposPage />
        </Provider>
      );
      expect(
        screen.getByText('No Repos Found for provided token')
      ).toBeDefined();
      expect(asFragment()).toMatchSnapshot();
    });

    test('with list of repos', () => {
      const data = [
        {
          id: 1,
          name: 'Name',
          full_name: 'full/name',
          description: 'Lorem Ipsum Dolor Sit Amet',
          stargazers_count: 1,
          open_issues_count: 3,
          html_url: 'https://github.com/full/name',
        },
        {
          id: 2,
          private: true,
          name: 'Name',
          full_name: 'full/name',
          description: 'Lorem Ipsum Dolor Sit Amet',
          stargazers_count: 1,
          open_issues_count: 3,
          html_url: 'https://github.com/full/name',
        },
        {
          id: 3,
          name: 'Name',
          full_name: 'full/name',
          description: 'Lorem Ipsum Dolor Sit Amet',
          stargazers_count: 1,
          open_issues_count: 3,
          html_url: 'https://github.com/full/name',
        },
      ];
      const { asFragment } = render(
        <Provider store={mockStore({ repos: { data } })}>
          <ReposPage />
        </Provider>
      );
      expect(screen.getAllByTestId('repo-details')).toHaveLength(3);
      expect(screen.getByText('lock')).toBeDefined();
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
