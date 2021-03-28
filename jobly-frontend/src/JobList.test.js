import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import JobList from "./JobList";

const jobs = [
  {
    id: 1,
    title: "Test 1",
    salary: 100,
    equity: "0.1",
    companyHandle: "test-company-1",
    companyName: "Test Company 1"
  },
  {
    id: 2,
    title: "Test 2",
    salary: 200,
    equity: "0.2",
    companyHandle: "test-company-1",
    companyName: "Test Company 1"
  },
  {
    id: 3,
    title: "Test 3",
    salary: 300,
    equity: "0.3",
    companyHandle: "test-company-2",
    companyName: "Test Company 2"
  }
];

const findAllJobs = jest.fn(() => null); // Learned how to mock functions at https://jestjs.io/docs/mock-functions

it("renders without crashing", () => {
  render(<MemoryRouter><JobList jobs={ jobs } /></MemoryRouter>);
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter><JobList jobs={ jobs } /></MemoryRouter>
  );
  
  expect(asFragment()).toMatchSnapshot();
});

it("shows list of jobs", () => {
  const { queryByTestId } = render(
    <MemoryRouter><JobList jobs={ jobs } /></MemoryRouter>
  );

  for (let job of jobs) {
    expect(queryByTestId(job.id)).toBeInTheDocument();
  }
});

it("updates searchbox when user types", () => {
  const { queryByPlaceholderText, queryByDisplayValue } = render(
    <MemoryRouter><JobList jobs={ jobs } /></MemoryRouter>
  );

  const searchBox = queryByPlaceholderText("Enter search term...");
  
  fireEvent.change(searchBox, { target: { value: "1" } });

  expect(queryByDisplayValue("1")).toBeInTheDocument();
});

it("calls findAllJobs with no filter when searchbox is empty", () => {
  const { queryByText } = render(
    <MemoryRouter>
      <JobList jobs={ jobs } findAllJobs={ findAllJobs } />
    </MemoryRouter>
  );

  const submitButton = queryByText("Submit");
  
  fireEvent.click(submitButton);

  expect(findAllJobs.mock.calls.length).toEqual(1);
  expect(findAllJobs.mock.calls[0].length).toEqual(0);
});

it("calls findAllJobs with filter when searchbox is empty", () => {
  const { queryByPlaceholderText, queryByText } = render(
    <MemoryRouter>
      <JobList jobs={ jobs } findAllJobs={ findAllJobs } />
    </MemoryRouter>
  );

  const searchBox = queryByPlaceholderText("Enter search term...");
  
  fireEvent.change(searchBox, { target: { value: "1" } });

  const submitButton = queryByText("Submit");
  
  fireEvent.click(submitButton);

  expect(findAllJobs.mock.calls.length).toEqual(1);
  expect(findAllJobs.mock.calls[0][0]).toEqual("1");
});