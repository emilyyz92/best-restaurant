import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Navbar = ({searchRest}) => (
  <nav class="navbar navbar-light">
    <Link to="/" className="navbar-brand">Grab-and-Go</Link>
    <Link to="/restaurants/new">Add your business</Link>
    <form class="form-inline">
      <input class="form-control mr-sm-2" type="search" placeholder="Search lunch places" aria-label="Search" />
      <button class="btn btn-outline-success my-2 my-sm-0"
        type="submit"
        onClick={searchRest}>
        Search
      </button>
    </form>
  </nav>
)

export default Navbar;
