import React from 'react'

const ListItem = ({res, toggleEmbed, menu}) => (
  <a href="#" className="list-group-item"
  onClick={toggleEmbed} data-id={res.id}>
    <div onClick={toggleEmbed} className="justify-content-between"
    data-id={res.id}>
      <h5 className="mb-1" data-id={res.id}>
        {res.name}
      </h5>
      {menu[res.id] && <iframe src={res.menu_url} title={res.id}
        width="80%" height="300"/>}
    </div>
  </a>
)

const RestaurantList = ({list, sortByRating, showMenu, toggleEmbed}) => (
  <div className="restaurants-list">
    <div className="res-button-group">
      <button onClick={sortByRating}>Sort by rating</button>
      <button>Open Now</button>
      <button>Reservation Available</button>
    </div>
    <ul className="list-group res-list">
      {list.map(res =>
        res && <ListItem res={res} toggleEmbed={toggleEmbed}
        menu={showMenu} key={res.id} />
      )}
    </ul>
  </div>
)

export default RestaurantList;
