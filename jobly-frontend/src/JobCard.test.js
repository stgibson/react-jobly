import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import JobCard from "./JobCard";

const job = {
  id: 1,
  title: "Job",
  salary: 100,
  equity: "0.5"
};

const findAllCompanies = jest.fn(() => null); // Learned how to mock functions at https://jestjs.io/docs/mock-functions

it("renders without crashing", () => {
  render(<MemoryRouter><JobCard job={ job } /></MemoryRouter>);
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter><JobCard job={ job } /></MemoryRouter>
  );
  
  expect(asFragment()).toMatchSnapshot();
});

it("shows job details", () => {
  const { queryByText } = render(
    <MemoryRouter><JobCard job={ job } /></MemoryRouter>
  );

  expect(queryByText(job.title)).toBeInTheDocument();
  expect(queryByText(`Salary: ${job.salary}`)).toBeInTheDocument();
  expect(queryByText(`Equity: ${job.equity}`)).toBeInTheDocument();
});