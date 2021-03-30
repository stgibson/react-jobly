import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import Home from "./Home";
import CurrentUserContext from "./CurrentUserContext";

const currentUser = {
  username: "test",
  password: "password",
  firstName: "Test",
  lastName: "User",
  email: "test@gmail.com"
};

it("renders without crashing", () => {
  render(<MemoryRouter><Home /></MemoryRouter>);
});

it("matches snapshot", () => {
  const { asFragment } = render(<MemoryRouter><Home /></MemoryRouter>);

  expect(asFragment()).toMatchSnapshot();
});

it("shows log in & sign up buttons when not logged in", () => {
  const { queryByText } = render(<MemoryRouter><Home /></MemoryRouter>);

  expect(queryByText("Log in")).toBeInTheDocument();
  expect(queryByText("Sign up")).toBeInTheDocument();
});

it("hides log in & sign up buttons when logged in", () => {
  const { queryByText } = render(
    <CurrentUserContext.Provider value={ currentUser }>
      <MemoryRouter><Home /></MemoryRouter>
    </CurrentUserContext.Provider>
  );

  expect(queryByText("Log in")).not.toBeInTheDocument();
  expect(queryByText("Sign up")).not.toBeInTheDocument();
});

it("shows welcome message with user's first name when logged in", () => {
  const { queryByText } = render(
    <CurrentUserContext.Provider value={ currentUser }>
      <MemoryRouter><Home /></MemoryRouter>
    </CurrentUserContext.Provider>
  );

  expect(queryByText("Welcome Back, Test!")).toBeInTheDocument();
});