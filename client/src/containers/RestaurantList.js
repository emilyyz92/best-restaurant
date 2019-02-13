import React, { Component } from 'react';
import '../css/List.css'
import MainMap from '../presentation/MainMap'
import ListItem from '../presentation/ListItem'
import { connect } from 'react-redux'

class RestaurantList extends Component {
  constructor() {
    super();
    this.state = {
      restShown: [],
      mapCenter: null,
      pages: [],
      pageIndex: 1
    }
  }

  componentDidMount() {
    this.setState({
      mapCenter: this.props.userLatLng
    })
  }
  //
  componentDidUpdate(prevProps) {
    if(this.props.restsList !== prevProps.restsList) {
      const totalPage = this.props.restsList.length
      const pages = new Array(Math.floor(totalPage / 10) + 1)
      for (let i = 0; i < pages.length; i++) {pages[i] = i+1}
      this.setState({
        restShown: this.props.restsList.slice(0, 10),
        pages: pages
      })
    }
  }

  turnPage = (page) => {
    // debugger;
    // this.setState({
    //   restShown: this.props.restsList.slice(10*(page-1), 10*page),
    //   pageIndex: page
    // })
  }

  toggleResDetail = (e) => {
    e.preventDefault()
    this.showResOnMap(e)
  }

  showResOnMap = (e) => {
    const resID = parseInt(e.target.dataset.id)
    const res = this.state.restShown.filter(res => res.id === resID)[0]
    const index = this.state.restShown.findIndex(res => res.id === resID)
    const new_res = {
      ...res,
      active: !res.active,
      showEmbed: !res.showEmbed
    }
    const newResList = [...this.state.restShown]
    newResList.splice(index, 1, new_res)
    this.setState({
      restShown: newResList,
      mapCenter: res.location
    })
  }

  render() {
    const toggleEmbed = this.props.toggleEmbed
    const showMenu = this.props.showMenu
    let mapCenter;
    if(this.state.mapCenter) {
      mapCenter = this.state.mapCenter
    } else {
      mapCenter = this.props.userLatLng
    }
    return (
      <div className="restaurants-list">
        <div className="res-list">
          <ul className="list-group">
            {this.state.restShown.map((res, index) =>
              res && <ListItem res={res}
              toggleDetail={this.toggleResDetail}
              key={index} index={index} />
            )}
          </ul>
          <div class="btn-group mr-2" role="group">
            {this.state.pages && this.state.pages.map(page =>
              <button type="button" className="btn btn-primary"
                onClick={this.turnPage(page)}
                key={page}>
                {page}
              </button>
            )}
          </div>
        </div>
        <MainMap userLatLng={mapCenter}
          restaurants={this.state.restShown}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  restsList: state.rests.restsList,
})

export default connect(mapStateToProps)(RestaurantList);
