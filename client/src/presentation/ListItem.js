import React from 'react'

const ListItem = ({res, toggleEmbed, menu, showOnMap}) => (
  <a href="#" className="list-group-item"
    onClick={toggleEmbed}
    data-id={res.id}
    onMouseOver={showOnMap}
    >
    <div onClick={toggleEmbed} className="justify-content-between"
    data-id={res.id}>
      <h5 className="mb-1" data-id={res.id}>
        {res.name}
      </h5>
      {menu[res.id] && <iframe src={res.menu_url} title={res.id}
        />}
    </div>
  </a>
)

export default ListItem;
