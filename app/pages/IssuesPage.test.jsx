import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import React from 'react';
import { render, screen } from '@testing-library/react';
import IssuesPage from './IssuesPage';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);

describe('IssuesPage', () => {
  describe('loading', () => {
    test('shows loading message', () => {
      const { asFragment } = render(
        <Provider
          store={mockStore({ repos: { data: [] }, issues: { loading: true } })}
        >
          <IssuesPage repoId="123456789" />
        </Provider>
      );
      expect(screen.getByText('Loading...')).toBeDefined();
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('with data', () => {
    test('empty array', () => {
      const { asFragment } = render(
        <Provider
          store={mockStore({ repos: { data: [] }, issues: { data: [] } })}
        >
          <IssuesPage repoId="123456789" />
        </Provider>
      );
      expect(
        screen.getByText(
          'No issues found for 123456789.Try selecting a different repo.'
        )
      ).toBeDefined();
      expect(asFragment()).toMatchSnapshot();
    });

    test('with list of repos', () => {
      const repos = [
        {
          id: 123456789,
          name: 'Name',
          full_name: 'full/name',
          description: 'Lorem Ipsum Dolor Sit Amet',
          stargazers_count: 1,
          open_issues_count: 3,
          html_url: 'https://github.com/full/name',
        },
      ];
      const data = [
        {
          id: 1,
          newIssue: true,
          title: 'Issue #1',
          user: {
            avatar_url: 'test.com',
          },
        },
        {
          id: 2,
          newIssue: false,
          title: 'Issue #2',
          user: {
            avatar_url: 'test.com',
          },
        },
        {
          id: 3,
          newIssue: false,
          title: 'Issue #3',
          user: {
            avatar_url: 'test.com',
          },
        },
      ];
      const { asFragment } = render(
        <Provider
          store={mockStore({ repos: { data: repos }, issues: { data } })}
        >
          <IssuesPage repoId="123456789" />
        </Provider>
      );
      expect(screen.getByTestId('repo-details')).toHaveClass('selected');
      expect(screen.getAllByTestId('issue-details')).toHaveLength(3);
      expect(screen.getAllByTestId('issue-details')[0]).toHaveClass('new');
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
