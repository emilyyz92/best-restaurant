import React, { Component } from 'react';
import '../css/List.css'
import MainMap from '../presentation/MainMap'
import ListItem from '../presentation/ListItem'
import { connect } from 'react-redux'

class RestaurantList extends Component {
  constructor() {
    super();
    this.state = {
      restList: []
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.restsList !== prevProps.restsList) {
      this.setState({
        restList: this.props.restsList
      })
    }
  }

  showResOnMap = (e) => {
    const resID = parseInt(e.target.dataset.id)
    const res = this.state.restList.filter(res => res.id === resID)
    const index = this.state.restList.findIndex(res => res.id === resID)
    const new_res = {...res[0], active: !res[0].active}
    this.state.restList[index] = new_res
    this.setState({
      restList: this.state.restList
    })
  }

  render() {
    const toggleEmbed = this.props.toggleEmbed
    const showMenu = this.props.showMenu
    const userLatLng = this.props.userLatLng

    return (
      <div className="restaurants-list">
        <div className="res-list">
          <ul className="list-group">
            {this.state.restList.map(res =>
              res && <ListItem res={res} toggleEmbed={toggleEmbed}
              menu={showMenu} key={res.id}
              showOnMap={this.showResOnMap} />
            )}
          </ul>
        </div>
        <MainMap userLatLng={userLatLng}
          restaurants={this.state.restList}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  restsList: state.rests.restsList,
  restsShown: state.rests.restsShown,
  pageIndex: state.pageIndex
})

const mapDispatchToProps = (dispatch) => ({
  pageControl: type => dispatch({type: type}),
  turnPage: index => dispatch({type: 'turnPage', index: index})
})

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);
