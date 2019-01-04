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
    document.addEventListener('keydown', this.search)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  search = (e) => {
    if(e.keyCode === 13) {
      if(this.state.keyword !== "" || this.state.location !== "") {
        this.props.search(this.state.keyword)
      }
    }
  }

  render() {
    return (
      <div className="searchBox">
        <input type="text" value={this.state.keyword}
        name="keyword"
        onChange={this.handleChange}
        placeholder="Search keywords or cuisine"
        />
        <input type="text" value={this.state.location}
        name="location" onChange={this.handleChange}
        placeholder="Zip Code or Street Address"
        />
        <button>Find Near Me</button>
      </div>
    )
  }
}

export default Search
