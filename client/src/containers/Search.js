import React, { Component } from 'react';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      keyword: ""
    }
    this.search = this.search.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.search)
  }

  handleChange = (e) => {
    this.setState({
      keyword: e.target.value
    })
  }

  search = (e) => {
    if(e.keyCode === 13) {
      this.props.search(this.state.keyword)
    }
  }

  render() {
    return (
      <div className="searchBox">
        <input type="text" value={this.state.keyword}
        onChange={this.handleChange}
        placeholder="Search keywords or cuisine"
        onKeyDown={this.search}
        />
      </div>
    )
  }
}

export default Search
