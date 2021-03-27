import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import './App.css';

/**
 * Main component for setting up routing and navbar
 * @returns JSX code for rendering navbar and routing
 */
function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar user={ user } />
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route exact path="/companies"><CompanyList /></Route>
          <Route exact path="/companies/:handle"><CompanyDetail /></Route>
          <Route exact path="/jobs"><JobList /></Route>
          <Route exact path="/login"><Login /></Route>
          <Route exact path="/signup"><Signup /></Route>
          <Route exact path="/profile"><Profile /></Route>
          <Route><Redirect to="/" /></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
