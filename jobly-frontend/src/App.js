import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
