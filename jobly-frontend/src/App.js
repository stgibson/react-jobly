import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import jwt from "jsonwebtoken";
import { useLocalStorage } from "./hooks";
import JoblyApi from "./api";
import NavBar from "./NavBar";
import Home from "./Home";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import CurrentUserContext from "./CurrentUserContext";

/**
 * Main component for setting up routing and navbar
 * @returns JSX code for rendering navbar and routing
 */
function App() {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [getTokenStorage, setTokenStroage, removeTokenStorage] =
    useLocalStorage("token");

  /**
   * Creates account for new user and updates token, and returns any errors
   * @param {Object{string}} data 
   * @returns 
   */
  const signup = async data => {
    let errors = [];
    try {
      const newToken = await JoblyApi.register(data);
      setTokenStroage(newToken);
      setToken(newToken);
    }
    catch (err) {
      errors = err;
    }
    finally {
      return { errors };
    }
  };

  /**
   * Logs user in by getting token, and returns any errors
   * @param {Object{string}} data 
   */
  const login = async data => {
    let errors = [];
    try {
      const newToken = await JoblyApi.getToken(data);
      setTokenStroage(newToken);
      setToken(newToken);
    }
    catch (err) {
      errors = err;
    }
    finally {
      return { errors };
    }
  };

  /**
   * Logs user out by setting token and currentUser to null
   */
  const logout = () => {
    removeTokenStorage(null);
    setToken(null);
    setCurrentUser(null);
    JoblyApi.removeToken();
  };

  /**
   * Updates companies using filter, if provided
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

  /**
   * Updates jobs using filter, if provided
   * @param {string|undefined} filter 
   */
  const findAllJobs = async filter => {
    let newJobs;
    if (!filter) {
      newJobs = await JoblyApi.findAllJobs();
    }
    else {
      newJobs = await JoblyApi.findAllJobs({ title: filter });
    }
    setJobs(newJobs);
  };

  /**
   * Gets current user details and stores in state
   */
  const getCurrentUser = async () => {
    const decodedToken = jwt.decode(token);
    if (decodedToken && decodedToken.username) {
      const user = await JoblyApi.getUser(decodedToken.username);
      setCurrentUser(user);
    }
  };

  /**
   * Edits user details with data, provided password is valid
   * @param {Object{string}} data 
   * @param {string} password 
   * @returns list of errors
   */
  const editUser = async (data, password) => {
    let errors = [];
    try {
      // first verify password
      if (await JoblyApi.authenticate(
        { username: currentUser.username, password: password }
      )) {
        const newUser = await JoblyApi.editUser(currentUser.username, data);
        setCurrentUser(newUser);
      }
      else {
        throw ["Incorrect password"];
      }
    }
    catch (err) {
      errors = err;
    }
    finally {
      return { errors };
    }
  };

  // get list of all companies & jobs
  useEffect(() => {
    findAllCompanies();
    findAllJobs();
  }, []);

  /**
   * Current user applies for job with id jobId. Also gets user again to
   * reflect recent change of applying for a job.
   * @param {number} jobId 
   */
  const apply = async jobId => {
    await JoblyApi.apply(currentUser.username, jobId);
    getCurrentUser();
  };

  // when app first renders, check if token in localStorage
  useEffect(() => {
    const tokenStorage = getTokenStorage();
    if (tokenStorage) {
      JoblyApi.setToken(tokenStorage);
      setToken(tokenStorage);
    }
  }, []);

  // when token updated, update current user
  useEffect(() => {
    if (token) {
      getCurrentUser();
    }
  }, [token]);

  return (
    <div>
      <CurrentUserContext.Provider value={ currentUser }>
        <BrowserRouter>
          <NavBar logout={ logout } />
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route exact path="/companies">
              <CompanyList
                companies={ companies }
                findAllCompanies={ findAllCompanies }
              />
            </Route>
            <Route exact path="/companies/:handle">
              <CompanyDetail getCompany={ getCompany } apply={ apply } />
            </Route>
            <Route exact path="/jobs">
              <JobList jobs={ jobs } findAllJobs={ findAllJobs } apply={ apply } />
            </Route>
            <Route exact path="/login"><Login login={ login } /></Route>
            <Route exact path="/signup"><Signup signup={ signup } /></Route>
            <Route exact path="/profile"><Profile editUser={ editUser } /></Route>
            <Route><Redirect to="/" /></Route>
          </Switch>
        </BrowserRouter>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
