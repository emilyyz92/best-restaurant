import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import '../css/App.css';
import {setRestaurants} from '../actions/resActions'
import Welcome from '../presentation/Welcome'
import Search from './Search'
import RestaurantList from './RestaurantList'
import Navbar from '../presentation/Navbar'
import RestaurantForm from './RestaurantForm'

class App extends Component {
  constructor() {
    super();
    this.state = {
      restsByDist: [],
      restsByRating: [],
      sortBy: 'distance',
      logos: [],
      userLatLng: "40.7638356,-73.9817048",
      listPageIndex: 1
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  //callback of search box
  handleSearch = (location) => {
    const locString = location.split(' ').join('+')
    this.postGoogleData(locString)
  }

  //get geolocation and call googleCallBack
  postGoogleData = (address) => {
    fetch(`/api/google/location?address=${address}`)
    .then(resp => resp.json())
    .then(json => this.googleCallBack(json.location))
    .catch(error => this.setState({
      error: error
    }))
  }

  //set state list of restaurants
  googleCallBack = (latLng) => {
    this.setState({
      userLatLng: latLng
    })
    fetch(`/api/google/search?address=${latLng}`, {method: "POST"})
    .then(resp => resp.json())
    .then(json => this.saveRestaurants(json))
    .catch(error => this.setState({
      error: error
    }))
  }

  //save restaurants to state by distance
  saveRestaurants = (jsonRes) => {
    this.props.setRestaurantsToState(jsonRes)
  }

  searchRest = (e) => {
    e.preventDefault()
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
    return (
      <Router>
        <div className="App">
          <Navbar searchRest={this.searchRest}/>
          <Route exact path="/" render={() => (
            <>
              <Search search={this.handleSearch} />
              <Welcome />
            </>
          )} />
          <Route exact path="/restaurants/new" render={RestaurantForm} />
          <Route exact path="/results" render={routerProps =>
            <RestaurantList {...routerProps}
              sortByRating={this.sortByRating}
              userLatLng={this.state.userLatLng}
            />}
          />
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
    setRestaurantsToState: rests => dispatch(setRestaurants(rests)),
})

export default connect(null, mapDispatchToProps)(App);
