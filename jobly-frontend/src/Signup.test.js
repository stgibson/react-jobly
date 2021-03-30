import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import Signup from "./Signup";

const signup = jest.fn(() => ({ errors: [] })); // Learned how to mock functions at https://jestjs.io/docs/mock-functions

it("renders without crashing", () => {
  render(<MemoryRouter><Signup /></MemoryRouter>);
});

it("matches snapshot", () => {
  const { asFragment } = render(<MemoryRouter><Signup /></MemoryRouter>);
  
  expect(asFragment()).toMatchSnapshot();
});

it("updates username input when user types", () => {
  const { queryByLabelText, queryByDisplayValue } = render(
    <MemoryRouter><Signup /></MemoryRouter>
  );

  const input = queryByLabelText("Username");
  
  fireEvent.change(input, { target: { id: "username", value: "test" } });

  expect(queryByDisplayValue("test")).toBeInTheDocument();
});

it("updates password input when user types", () => {
  const { queryByLabelText, queryByDisplayValue } = render(
    <MemoryRouter><Signup /></MemoryRouter>
  );

  const input = queryByLabelText("Password");
  
  fireEvent.change(input, { target: { id: "password", value: "password" } });

  expect(queryByDisplayValue("password")).toBeInTheDocument();
});

it("updates first name input when user types", () => {
  const { queryByLabelText, queryByDisplayValue } = render(
    <MemoryRouter><Signup /></MemoryRouter>
  );

  const input = queryByLabelText("First name");
  
  fireEvent.change(input, { target: { id: "firstName", value: "Test" } });

  expect(queryByDisplayValue("Test")).toBeInTheDocument();
});

it("updates last name input when user types", () => {
  const { queryByLabelText, queryByDisplayValue } = render(
    <MemoryRouter><Signup /></MemoryRouter>
  );

  const input = queryByLabelText("Last name");
  
  fireEvent.change(input, { target: { id: "lastName", value: "User" } });

  expect(queryByDisplayValue("User")).toBeInTheDocument();
});

it("updates email input when user types", () => {
  const { queryByLabelText, queryByDisplayValue } = render(
    <MemoryRouter><Signup /></MemoryRouter>
  );

  const input = queryByLabelText("Email");
  
  fireEvent.change(
    input,
    { target: { id: "email", value: "test@gmail.com" } }
  );

  expect(queryByDisplayValue("test@gmail.com")).toBeInTheDocument();
});

it("calls signup when user submits form", () => {
  const { queryByLabelText, queryByText } = render(
    <MemoryRouter><Signup signup={ signup } /></MemoryRouter>
  );

  const usernameInput = queryByLabelText("Username");
  const passwordInput = queryByLabelText("Password");
  const firstNameInput = queryByLabelText("First name");
  const lastNameInput = queryByLabelText("Last name");
  const emailInput = queryByLabelText("Email");
  const submitButton = queryByText("Submit");
  
  fireEvent.change(usernameInput, { target: { value: "test" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });
  fireEvent.change(firstNameInput, { target: { id: "firstName", value: "Test" } });
  fireEvent.change(lastNameInput, { target: { id: "lastName", value: "User" } });
  fireEvent.change(
    emailInput,
    { target: { id: "email", value: "test@gmail.com" } }
  );
  fireEvent.click(submitButton);

  expect(signup.mock.calls.length).toEqual(1);
  expect(signup.mock.calls[0][0].username).toEqual("test");
  expect(signup.mock.calls[0][0].password).toEqual("password");
  expect(signup.mock.calls[0][0].firstName).toEqual("Test");
  expect(signup.mock.calls[0][0].lastName).toEqual("User");
  expect(signup.mock.calls[0][0].email).toEqual("test@gmail.com");
});
