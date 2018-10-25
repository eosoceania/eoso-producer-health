import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';

import ProducerList from '../containers/producer-list';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ProducerList />
      </div>
    );
  }
}

export default App;
