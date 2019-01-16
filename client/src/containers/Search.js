import React, { Component } from 'react';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      keyword: "",
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
    if(this.state.keyword !== "" || this.state.location !== "") {
      this.props.search(this.state.keyword, this.state.location)
    }
  }

  render() {
    return (
      <div className="searchBox">
        <label>Search Keyword</label>
        <input type="text" value={this.state.keyword}
        name="keyword"
        onChange={this.handleChange}
        placeholder="Search keywords or cuisine"
        />
        <label>Location</label>
        <input type="text" value={this.state.location}
        name="location" onChange={this.handleChange}
        placeholder="Zip Code or Street Address"
        />
        <button onClick={this.search}>Search Food</button>
        <button>Find Near Me</button>
      </div>
    )
  }
}

export default Search
