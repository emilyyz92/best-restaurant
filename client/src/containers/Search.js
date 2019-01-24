import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      location: ""
    }
    this.search = this.search.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDownSearch)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  keyDownSearch = (e) => {
    if(e.keyCode === 13) {
      this.search()
    }
  }

  search = () => {
    if(this.state.location !== "") {
      this.props.search(this.state.location)
    }
  }

  render() {
    return (
      <div className="searchBox">
        <label>Location</label>
        <input type="text" value={this.state.location}
        name="location" onChange={this.handleChange}
        placeholder="Zip Code or Street Address"
        />
        <button onClick={this.search}>
          <Link to="/results">Search Food</Link>
        </button>
        <button>Find Near Me</button>
      </div>
    )
  }
}

export default Search
