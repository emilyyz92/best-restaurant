import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import '../css/App.css';
import Welcome from '../presentation/Welcome'
import Search from './Search'
import RestaurantList from './RestaurantList'

class App extends Component {
  constructor() {
    super();
    this.state = {
      restsByDist: [],
      restsByRating: [],
      sortBy: 'distance',
      showEmbed: false,
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
    .then(json => this.setRestaurants(json))
    .catch(error => this.setState({
      error: error
    }))
  }

  //save restaurants to state by distance
  setRestaurants = (jsonRes) => {
    this.setState({
      restsByDist: jsonRes
    })
    this.props.setRestaurants(jsonRes)
  }

  sortByRating = () => {
    let sortedRests = this.state.restsByDist
    sortedRests.sort((a, b) => b.rating - a.rating)
    this.setState({
      sortBy: 'rating',
      restsByRating: sortedRests
    })
  }

  //toggles view of each restaurant info
  toggleEmbed = (e) => {
    e.preventDefault()
    let resID = e.target.dataset.id
    this.setState({
      showEmbed: {
        ...this.state.showEmbed,
        [resID]: !this.state.showEmbed[resID]
      }
    })
  }

  render() {
    let renderedList = []
    let pageIndex = this.state.listPageIndex
    if(this.state.sortBy === 'distance') {
      renderedList = this.state.restsByDist.slice(10*(pageIndex-1), pageIndex-1)
    } else if (this.state.sortBy === 'rating') {
      renderedList = this.state.restsByRating.slice(10*(pageIndex-1), pageIndex-1)
    }
    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={() => (
            <>
              <Search search={this.handleSearch} />
              <Welcome />
            </>
          )} />
          <Route exact path="/results" render={routerProps =>
            <RestaurantList {...routerProps}
              sortByRating={this.sortByRating}
              showMenu={this.state.showEmbed}
              toggleEmbed={this.toggleEmbed}
              userLatLng={this.state.userLatLng}
            />}
          />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  restsList: state.rests.restsList,
  restsShown: state.rests.restsShown
})

const mapDispatchToProps = (dispatch) => ({
    setRestaurants: rests => dispatch({
      type: 'setRestaurants',
      rests: rests
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
