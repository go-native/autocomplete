import { connect } from 'react-redux';
import React from 'react'
import AutoCompletion from './components/AutoCompletion';
import { getRepos } from './get-repos';

const ReposAutocompletion = ({ dispatch, repos, isFetching }) => {
  return (
    <AutoCompletion
      items={repos}
      isFetching={isFetching}
      onSelect={(item) => console.log(`Selected item `, item)}
      onChange={(query) => dispatch(getRepos(query))}
    />
  )
}

const mapStateToProps = (state) => (
  {
    repos: state.repos,
    isFetching: state.isFetching
  }
);

export default connect(mapStateToProps)(ReposAutocompletion);
