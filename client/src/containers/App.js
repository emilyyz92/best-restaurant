import React, { Component } from 'react';
import '../css/App.css';
import Search from './Search'
import RestaurantList from '../presentation/RestaurantList'

class App extends Component {
  constructor() {
    super();
    this.getReviews = this.getReviews.bind(this)
    this.state = {
      restsByDist: [],
      restsByRating: [],
      sortBy: 'distance'
    }
  }

  //when user enters to search
  handleSearch = (keyword, location) => {
    const locString = location.split(' ').join('+')
    this.postGoogleData(keyword, locString)
  }

  //calls api to get google search
  postGoogleData = (keyword, address) => {
    fetch(`/api/google/search?keyword=${keyword}&address=${address}`, {
      method: 'POST',
    }).then(resp => resp.json())
    .then(json => this.getReviews(json))
    .catch(error => console.log(error))
  }

  //get yelp review info after google search
  getReviews = (jsonRestaurants) => {
    debugger;
    jsonRestaurants.forEach(
      res => this.patchYelpData(res)
    )
  }

  patchYelpData = (res) => {
    const name = res['name']
    const lat = res['location'].split(',')[0]
    const lng = res['location'].split(',')[1]
    const googleID = res['google_id']
    //api returns json of each restaurant object
    fetch(`/api/yelp/search?name=${name}&lat=${lat}&lng=${lng}&googleid=${googleID}`, {
      method: 'PATCH'
    }).then(resp => resp.json())
    .then(json => this.setRestaurants(json))
  }

  //save restaurants to state by distance
  setRestaurants = (jsonRes) => {
    this.setState({
      restsByDist: [
        ...this.state.restsByDist,
        jsonRes
      ]
    })
  }

  //render yelp star images
  getStars = (res) => {
    const yelpImages = {
      1: "/small_1.png",
      1.5: "/small_1_half.png",
      2: '/small_2.png',
      2.5: '/small_2_half.png',
      3: '/small_3.png',
      3.5: '/small_3_half.png',
      4: '/small_4.png',
      4.5: '/small_4_half.png',
      5: '/small_5.png'
    }
    let rating = res['rating'].toString()
    return '/yelp_images' + yelpImages[rating]
  }

  sortByRating = () => {
    let sortedRests = this.state.restsByDist
    sortedRests.sort((a, b) => b.rating - a.rating)
    this.setState({
      sortBy: 'rating',
      restsByRating: sortedRests
    })
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
        <RestaurantList list={renderedList}
        getStars={this.getStars}
        sortByRating={this.sortByRating}
        />
      </div>
    );
  }
}

export default App;
