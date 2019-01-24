import React, { Component } from 'react';
import '../css/List.css'
import MainMap from '../presentation/MainMap'
import ListItem from '../presentation/ListItem'


class RestaurantList extends Component {
  render() {
    const list = this.props.restsShown
    const toggleEmbed = this.props.toggleEmbed
    const showMenu = this.props.showMenu
    const userLatLng = this.props.userLatLng

    return (
      <div className="restaurants-list">
        <div className="res-list">
          <ul className="list-group">
            {list.map(res =>
              res && <ListItem res={res} toggleEmbed={toggleEmbed}
              menu={showMenu} key={res.id} />
            )}
          </ul>
        </div>
        <MainMap userLatLng={userLatLng}
          restaurants={list}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  restsList: state.rests.restsList,
  restsShown: state.rests.restsShown,
  pageIndex: state.pageIndex
}

const mapDispatchToProps = (dispatch) => {
  pageControl: type => dispatch({type: type}),
  turnPage: index => dispatch({type: 'turnPage', index: index})
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);
