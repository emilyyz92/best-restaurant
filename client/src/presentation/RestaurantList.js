import React from 'react'

const ListItem = ({res, getStars}) => (
  <a href={res.yelp_url} key={res.id} className="list-group-item" >
    <div className="justify-content-between">
      <h5 className="mb-1">{res.name}</h5>
      <img src={getStars(res)} alt={res.rating} />
      <small>{res.review_count}</small>
    </div>
  </a>
)

const RestaurantList = ({list, getStars, sortByRating}) => (
  <div className="restaurants-list">
    <div className="res-button-group">
      <button onClick={sortByRating}>Sort by rating</button>
      <button>Open Now</button>
      <button>Reservation Available</button>
    </div>
    <ul className="list-group res-list">
      {list.map(res =>
        res && <ListItem res={res} getStars={getStars}/>
      )}
    </ul>
  </div>
)

export default RestaurantList;
