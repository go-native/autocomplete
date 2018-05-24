export const GET_REPOS_REQUEST = 'GET_REPOS_REQUEST';
export const GET_REPOS_SUCCESS = 'GET_REPOS_RESPONSE';
export const GET_REPOS_ERROR = 'GET_REPOS_ERROR';

export const getReposRequest = () => ({
  type: GET_REPOS_REQUEST
});
export const getReposSuccess = (payload) => ({
  type: GET_REPOS_SUCCESS,
  payload
});
export const getReposError = (payload) => ({
  type: GET_REPOS_ERROR,
  payload
});

const LIMIT = 10;
export const getRepos = (query) => (dispatch => {
  dispatch(getReposRequest());
  if (!query || query.trim().length === 0) {
    dispatch(getReposSuccess([]));
    return;
  }
  return new Promise((resolve, reject) => {
    fetch(`https://api.github.com/search/repositories?q=${query}&size=10&sort=stars&order=desc`)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        dispatch(getReposSuccess(result.items.slice(0, LIMIT)));
      })
      .catch(err => dispatch(getReposError(err)));
  });
})
