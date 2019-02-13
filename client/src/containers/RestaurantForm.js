import React, { Component } from 'react';

class RestaurantForm extends Component {
  constructor() {
    super();
    this.state = {
      formData: {}
    }
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <label for="formResName">Restaurant Name</label>
          <input type="text" className="form-control"
          id="formResName" placeholder="Restaurant Name" />
        </div>
        <div className="form-group">
          <label for="formResLocation">Location</label>
          <input type="text" className="form-control"
          id="formResLocation"
          placeholder="Full Address of the Restaurant" />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Your Restaurant
        </button>
      </form>
    )
  }
}

export default RestaurantForm
