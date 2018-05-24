import React, { Component } from 'react';
import './App.css';
import { store } from './store';
import { Provider } from 'react-redux';
import ReposAutocompletion from './ReposAutocompletion';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <div className="cnt">
            <ReposAutocompletion/>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
