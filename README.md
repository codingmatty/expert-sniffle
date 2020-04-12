# Github Issue Prioritizer

---

This project allows you to use a Github Personal Access Token to load a list of Repos and then prioritize the issues for that repo as necessary.

![](./demo.gif)

## Getting Started

1. Install Dependencies
1. Start Dev
1. Open localhost:3030

```
git clone git@github.com:codingmatty/expert-sniffle.git
cd expert-sniffle
yarn install
yarn dev
open http://localhost:3030
```

## Testing

Use `yarn test` to run the tests.

I focused on testing each "page" which covers most components. I didn't drill down to focus on handlers within components.

## Notes

* The access token is persisted in LocalStorage
* The currently selected repo is moved to the top of the list on the left side, and there is an implicit most recently selected repo ordering.
* The app is responsive and able to cycle between updating the token, selecting a repo, and reordering issues on a small screen.

### Issue Order

An array of Issue IDs are stored in LocalStorage when someone goes to order the Issues.
This occurs in the Redux Action that reorders issues for the Redux store.
Then when issues are loaded from Github they are reordered based on the order of the Issue IDs.

To use an API we would just update these actions to asynchronously send these reordered issues (maybe showing an error message if one occurs, but not reverting the order the user can see on the client), and then fetching from that API at the same time we get the Issues from Github and reorder them.

Or a better way may be to fetch pre-ordered issues from the API, ordering the issues on our own server:

```
Client -> Server -> Github -> Server (order issues, unseen issues on top) -> Client
```

* New issues (i.e. ones that have not been saved in an order on the client) are set to the top of the list.
* I decided to only store issue IDs, rather than the entire issue payload, so that we will always see the most updated info on the Issue instead of dealing with possibly outdated data.
