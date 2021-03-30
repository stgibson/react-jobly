import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      const message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  static async authenticate(data) {
    try {
      await this.request("auth/token", data, "post");
      return true;
    }
    catch (err) {
      return false;
    }
  }

  /** Gets token for user. */

  static async getToken(data) {
    const res = await this.request("auth/token", data, "post");
    this.token = res.token;
    return this.token;
  }

  /** Sets token for user. */

  static async setToken(token) {
    this.token = token;
  }

  /** Removes token for when user is logging out. */

  static removeToken() {
    this.token = null;
  }

  /** Registers user and gets token for new user. */

  static async register(data) {
    const res = await this.request("auth/register", data, "post");
    this.token = res.token;
    return this.token;
  }

  /** Get list of companies, possibly by filter. */

  static async findAllCompanies(filters = {}) {
    const res = await this.request("companies", filters);
    return res.companies;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    const res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get list of jobs, possibly by filter. */

  static async findAllJobs(filters = {}) {
    const res = await this.request("jobs", filters);
    return res.jobs;
  }

  /** Get details on a user by username. */

  static async getUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Edits user, provided valid password. */

  static async editUser(username, data) {
    const res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  /** Applies for a job for a user. */

  static async apply(username, jobId) {
    await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
  }
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;