import React from 'react'
import GoogleMapReact from 'google-map-react';
import Marker from './Marker'

const defaultCenter = (userLatLng) => (
  {
    lat: parseFloat(userLatLng.split(",")[0]),
    lng: parseFloat(userLatLng.split(",")[1])
  }
)

const MainMap = ({restaurants, userLatLng, showMarkerDetail}) => (
  <div className="map-container" style={{height: "700px", width: "50%"}}>
    <GoogleMapReact
      bootstrapURLKeys={{key: process.env.REACT_APP_GOOG_KEY}}
      defaultZoom={15}
      center={defaultCenter(userLatLng)}
    >
      {restaurants.map(res => (
        <Marker key={res.id}
          res={res}
          lat={res.location.split(",")[0]}
          lng={res.location.split(",")[1]}
        />
      ))}
    </GoogleMapReact>
  </div>
)

export default MainMap
