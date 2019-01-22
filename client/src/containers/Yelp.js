import React, { Component } from 'react';

class Yelp extends Component {
  constructor() {
    this.getReviews = this.getReviews.bind(this)
  }

  //get yelp review info after google search
  getReviews = (jsonRestaurants) => {
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
    .catch(() => '')
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
    let rating = res['rating'] && res['rating'].toString()
    return '/yelp_images' + yelpImages[rating]
  }


}
