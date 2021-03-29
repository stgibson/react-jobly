import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import CurrentUserContext from "./CurrentUserContext";
import "./NavBar.css";

/**
 * Component for displaying navbar
 * @returns JSX code for rendering navbar
 */
const NavBar = () => {
  const currentUser = useContext(CurrentUserContext);

  if (currentUser) {
    return (
      <div className="NavBar">
        <Link className="NavBar-brand" to="/">Jobly</Link>
        <NavLink className="NavBar-link" to="/companies">Companies</NavLink>
        <NavLink className="NavBar-link" to="/jobs">Jobs</NavLink>
        <NavLink className="NavBar-link" to="/profile">Profile</NavLink>
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