import React from 'react'

const Buttons = ({sortByRating}) => (
  <div className="res-button-group">
    <button onClick={sortByRating}>Sort by rating</button>
    <button>Open Now</button>
    <button>Reservation Available</button>
  </div>
)
