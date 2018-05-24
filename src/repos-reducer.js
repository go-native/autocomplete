import { GET_REPOS_REQUEST, GET_REPOS_SUCCESS, GET_REPOS_ERROR } from "./get-repos";

const initialState = {
  repos: [],
  isFetching: false,
  error: null
}

export const reposReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REPOS_REQUEST:
      return {
        ...state,
        repos: [],
        isFetching: true,
        error: null
      }
    case GET_REPOS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        repos: action.payload
      }
    case GET_REPOS_ERROR:
      return {
        ...state,
        isFetching: false,
        repos: [],
        error: action.payload
      }
    default:
      return state
  }
}
