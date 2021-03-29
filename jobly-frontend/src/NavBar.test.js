import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import NavBar from "./NavBar";
import CurrentUserContext from "./CurrentUserContext";

const currentUser = {
  username: "test",
  firstName: "Test",
  lastName: "User",
  email: "test@gmail.com",
  isAdmin: false,
  jobs: {}
}

it("renders without crashing", () => {
  render(<MemoryRouter><NavBar /></MemoryRouter>);
});

it("matches snapshot", () => {
  const { asFragment } = render(<MemoryRouter><NavBar /></MemoryRouter>);
  
  expect(asFragment()).toMatchSnapshot();
});

it("only shows Login & Sign Up when no user is passed", () => {
  const { queryByText } =
    render(<MemoryRouter><NavBar /></MemoryRouter>);
  
  expect(queryByText("Login")).toBeInTheDocument();
  expect(queryByText("Sign Up")).toBeInTheDocument();
  expect(queryByText("Companies")).not.toBeInTheDocument();
  expect(queryByText("Jobs")).not.toBeInTheDocument();
  expect(queryByText("Profile")).not.toBeInTheDocument();
});

it("only shows Companies, Jobs, & Profile when user is passed", () => {
  const { queryByText } =
    render(
      <CurrentUserContext.Provider value={ currentUser }>
        <MemoryRouter><NavBar /></MemoryRouter>
      </CurrentUserContext.Provider>
    );
  
  expect(queryByText("Companies")).toBeInTheDocument();
  expect(queryByText("Jobs")).toBeInTheDocument();
  expect(queryByText("Profile")).toBeInTheDocument();
  expect(queryByText("Login")).not.toBeInTheDocument();
  expect(queryByText("Sign Up")).not.toBeInTheDocument();
});