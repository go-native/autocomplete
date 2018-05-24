import React, { Component } from 'react';
import './App.css';
import AutoCompletion from './AutoCompletion/AutoCompletion';

const ALL_REPOS =  [
  {id:1, name: "Tensorflow"}, 
  {id:3, name: "VisualStudioCode"}, 
  {id:2, name: "Quandoo"}
]
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {repos: []};
  }
  searchRepos(query) {
    this.setState({repos: ALL_REPOS.filter(r => r.name.indexOf(query) !== -1)})
  }
  render() {
    return (
      <div className="App">
        <AutoCompletion
          items={this.state.repos}
          onSelect={(selectedItem) => console.log(selectedItem)}
          onChange={(query) => this.searchRepos((query))}
        />
      </div>
    );
  }
}

export default App;
