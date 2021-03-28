import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import CompanyList from "./CompanyList";

const companies = [
  {
    handle: "test-1",
    name: "Test 1",
    description: "Test Description 1",
    numEmployees: 100,
    logoUrl: "/logos/logo1.png"
  },
  {
    handle: "test-2",
    name: "Test 2",
    description: "Test Description 2",
    numEmployees: 200,
    logoUrl: "/logos/logo2.png"
  },
  {
    handle: "test-3",
    name: "Test 3",
    description: "Test Description 3",
    numEmployees: 300,
    logoUrl: "/logos/logo3.png"
  }
];

const findAllCompanies = jest.fn(() => null); // Learned how to mock functions at https://jestjs.io/docs/mock-functions

it("renders without crashing", () => {
  render(<MemoryRouter><CompanyList companies={ companies } /></MemoryRouter>);
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter><CompanyList companies={ companies } /></MemoryRouter>
  );
  
  expect(asFragment()).toMatchSnapshot();
});

it("shows list of companies", () => {
  const { queryByTestId } = render(
    <MemoryRouter><CompanyList companies={ companies } /></MemoryRouter>
  );

  for (let company of companies) {
    expect(queryByTestId(company.handle)).toBeInTheDocument();
  }
});

it("updates searchbox when user types", () => {
  const { queryByPlaceholderText, queryByDisplayValue } = render(
    <MemoryRouter><CompanyList companies={ companies } /></MemoryRouter>
  );

  const searchBox = queryByPlaceholderText("Enter search term...");
  
  fireEvent.change(searchBox, { target: { value: "1" } });

  expect(queryByDisplayValue("1")).toBeInTheDocument();
});

it("calls findAllCompanies with no filter when searchbox is empty", () => {
  const { queryByText } = render(
    <MemoryRouter>
      <CompanyList
        companies={ companies }
        findAllCompanies={ findAllCompanies }
      />
    </MemoryRouter>
  );

  const submitButton = queryByText("Submit");
  
  fireEvent.click(submitButton);

  expect(findAllCompanies.mock.calls.length).toEqual(1);
  expect(findAllCompanies.mock.calls[0].length).toEqual(0);
});

it("calls findAllCompanies with filter when searchbox is empty", () => {
  const { queryByPlaceholderText, queryByText } = render(
    <MemoryRouter>
      <CompanyList
        companies={ companies }
        findAllCompanies={ findAllCompanies }
      />
    </MemoryRouter>
  );

  const searchBox = queryByPlaceholderText("Enter search term...");
  
  fireEvent.change(searchBox, { target: { value: "1" } });

  const submitButton = queryByText("Submit");
  
  fireEvent.click(submitButton);

  expect(findAllCompanies.mock.calls.length).toEqual(1);
  expect(findAllCompanies.mock.calls[0][0]).toEqual("1");
});