import React, { Component } from 'react';
import { Popover, PopoverHeader } from 'reactstrap'

const style = {
  borderRadius: "2px",
  fontSize: "1em",
  backgroundColor: "#00ace6",
  border: "2px solid #bfbfbf",
  fontStyle: "bold",
  display: 'inline'
};

class Marker extends Component {
  constructor() {
    super()
    this.state = {
      popOver: false
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.res.active !== prevProps.res.active) {
      this.togglePopover()
    }
  }

  togglePopover = () => {
    this.setState({
      popOver: !this.state.popOver
    })
  }

  showMarkerDetail = (e) => {
    console.log(e.target)
  }

  render() {
    const res = this.props.res
    return (
      <>
        <div className="map-marker"
          style={style} onClick={this.showDetail}
          id={`marker-${res.id}`}
        >
          {res.name}
        </div>
        <Popover placement="top" isOpen={this.state.popOver}
          target={`marker-${res.id}`} toggle={this.togglePopover} >
          <PopoverHeader>{res.name}</PopoverHeader>
        </Popover>
      </>
    )
  }
}

export default Marker
