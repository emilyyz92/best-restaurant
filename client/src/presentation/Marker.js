import React from 'react';

const style = {
  borderRadius: "2px",
  fontSize: "1em",
  backgroundColor: "#00ace6",
  border: "2px solid #bfbfbf",
  fontStyle: "bold",
  width: "10px",
  height: "8px"
};

const Marker = ({res}) => (
  <div style={style}>
    {res.name}
  </div>
)

export default Marker
