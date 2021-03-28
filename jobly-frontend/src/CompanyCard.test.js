import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import CompanyCard from "./CompanyCard";

const company = {
  handle: "test",
  name: "Test",
  description: "Test Description",
  numEmployees: 100,
  logoUrl: "/logos/logo1.png"
};

const findAllCompanies = jest.fn(() => null); // Learned how to mock functions at https://jestjs.io/docs/mock-functions

it("renders without crashing", () => {
  render(<MemoryRouter><CompanyCard company={ company } /></MemoryRouter>);
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter><CompanyCard company={ company } /></MemoryRouter>
  );
  
  expect(asFragment()).toMatchSnapshot();
});

it("shows company details", () => {
  const { queryByText, queryByTestId } = render(
    <MemoryRouter><CompanyCard company={ company } /></MemoryRouter>
  );

  expect(queryByText(company.name)).toBeInTheDocument();
  expect(queryByText(company.description)).toBeInTheDocument();
  expect(queryByTestId(company.logoUrl)).toBeInTheDocument();
});