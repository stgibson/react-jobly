import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import JoblyApi from "./api";
import NavBar from "./NavBar";
import Home from "./Home";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";

/**
 * Main component for setting up routing and navbar
 * @returns JSX code for rendering navbar and routing
 */
function App() {
  const [user, setUser] = useState(null);
  const [companies, setCompanies] = useState([]);

  /**
   * Updates companies using filter, if there is any
   * @param {string|undefined} filter 
   */
  const findAllCompanies = async filter => {
    let newCompanies;
    if (!filter) {
      newCompanies = await JoblyApi.findAllCompanies();
    }
    else {
      newCompanies = await JoblyApi.findAllCompanies({ name: filter });
    }
    setCompanies(newCompanies);
  };

  /**
   * Gets company with given handle
   * @param {string} handle 
   * @returns company
   */
  const getCompany = async handle => {
    return await JoblyApi.getCompany(handle);
  };

  // initialize companies to list all companies
  useEffect(findAllCompanies, [])

  return (
    <div>
      <BrowserRouter>
        <NavBar user={ user } />
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route exact path="/companies">
            <CompanyList
              companies={ companies }
              findAllCompanies={ findAllCompanies }
            />
          </Route>
          <Route exact path="/companies/:handle"><CompanyDetail user={ user } getCompany={ getCompany } /></Route>
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
