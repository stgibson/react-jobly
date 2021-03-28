import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";

/**
 * Component for displaying navbar
 * @param {Object{Object{string|boolean|Object{number}}}} param0
 * @returns JSX code for rendering navbar
 */
const NavBar = ({ user }) => {
  if (user) {
    return (
      <div className="NavBar">
        <Link to="/">Jobly</Link>
        <NavLink to="/companies">Companies</NavLink>
        <NavLink to="/jobs">Jobs</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </div>
    );
  }
  return (
    <div className="NavBar">
      <Link className="NavBar-brand" to="/">Jobly</Link>
      <NavLink className="NavBar-link" to="/login">Login</NavLink>
      <NavLink className="NavBar-link" to="/signup">Sign Up</NavLink>
    </div>
  );
};

export default NavBar;