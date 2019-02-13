import React from 'react'

const ListItem = ({res, toggleDetail, index}) => (
  <a href="#" className="list-group-item"
    onClick={toggleDetail}
    data-id={res.id}
    >
    <div onClick={toggleDetail} className="justify-content-between"
    data-id={res.id}>
      <h5 className="mb-1" data-id={res.id}>
        {res.name}
      </h5>
      <div className="list-marker-id">{index+1}</div>
      {res.showEmbed && <iframe src={res.menu_url} title={res.id}
        />}
    </div>
  </a>
)

export default ListItem;
