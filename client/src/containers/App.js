import React, { Component } from 'react';
import '../css/App.css';
import Welcome from '../presentation/Welcome'
import Search from './Search'
import RestaurantList from '../presentation/RestaurantList'

class App extends Component {
  constructor() {
    super();
    this.state = {
      restsByDist: [],
      restsByRating: [],
      sortBy: 'distance',
      showEmbed: false,
      logos: []
    }
  }

  //when user enters to search
  handleSearch = (location) => {
    const locString = location.split(' ').join('+')
    this.postGoogleData(locString)
  }

  //calls api to get google search
  postGoogleData = (address) => {
    fetch(`/api/google/search?address=${address}`, {
      method: 'POST',
    }).then(resp => resp.json())
    .then(json => this.setRestaurants(json))
    .catch(error => console.log(error))
  }

  //save restaurants to state by distance
  setRestaurants = (jsonRes) => {
    this.setState({
      restsByDist: jsonRes
    })
  }

  sortByRating = () => {
    let sortedRests = this.state.restsByDist
    sortedRests.sort((a, b) => b.rating - a.rating)
    this.setState({
      sortBy: 'rating',
      restsByRating: sortedRests
    })
  }

  toggleEmbed = (e) => {
    e.preventDefault()
    let resID = e.target.dataset.id
    if(this.state.showEmbed.resID) {
      this.setState({
        showEmbed: {
          ...this.state.showEmbed,
          [resID]: !this.state.showEmbed.resID
        }
      })
    } else {
      this.setState({
        showEmbed: {
          ...this.state.showEmbed,
          [resID]: true
        }
      })
    }
  }

  render() {
    let renderedList = []
    if(this.state.sortBy === 'distance') {
      renderedList = this.state.restsByDist
    } else if (this.state.sortBy === 'rating') {
      renderedList = this.state.restsByRating
    }
    return (
      <div className="App">
        <Search search={this.handleSearch} />
        <Welcome />
        <RestaurantList list={renderedList}
          sortByRating={this.sortByRating}
          showMenu={this.state.showEmbed}
          toggleEmbed={this.toggleEmbed}
        />
      </div>
    );
  }
}

export default App;
