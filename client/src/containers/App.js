import React, { Component } from 'react';
import '../css/App.css';
import Search from './Search'

class App extends Component {
  handleSearch = () => {
    return "restaurants";
  }

  render() {
    return (
      <div className="App">
        <Search search={this.handleSearch} />
      </div>
    );
  }
}

export default App;
