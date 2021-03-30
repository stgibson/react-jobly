import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import Login from "./Login";

const login = jest.fn(() => ({ errors: [] })); // Learned how to mock functions at https://jestjs.io/docs/mock-functions

it("renders without crashing", () => {
  render(<MemoryRouter><Login /></MemoryRouter>);
});

it("matches snapshot", () => {
  const { asFragment } = render(<MemoryRouter><Login /></MemoryRouter>);
  
  expect(asFragment()).toMatchSnapshot();
});

it("updates username input when user types", () => {
  const { queryByLabelText, queryByDisplayValue } = render(
    <MemoryRouter><Login /></MemoryRouter>
  );

  const input = queryByLabelText("Username");
  
  fireEvent.change(input, { target: { id: "username", value: "test" } });

  expect(queryByDisplayValue("test")).toBeInTheDocument();
});

it("updates password input when user types", () => {
  const { queryByLabelText, queryByDisplayValue } = render(
    <MemoryRouter><Login /></MemoryRouter>
  );

  const input = queryByLabelText("Password");
  
  fireEvent.change(input, { target: { id: "password", value: "password" } });

  expect(queryByDisplayValue("password")).toBeInTheDocument();
});

it("calls login when user submits form", () => {
  const { queryByLabelText, queryByText } = render(
    <MemoryRouter><Login login={ login } /></MemoryRouter>
  );

  const usernameInput = queryByLabelText("Username");
  const passwordInput = queryByLabelText("Password");
  const submitButton = queryByText("Submit");
  
  fireEvent.change(usernameInput, { target: { value: "test" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });
  fireEvent.click(submitButton);

  expect(login.mock.calls.length).toEqual(1);
  expect(login.mock.calls[0][0].username).toEqual("test");
  expect(login.mock.calls[0][0].password).toEqual("password");
});
