import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import JobCard from "./JobCard";

/**
 * Component for listing jobs with a search box for filtering jobs
 * @param
 * {Object{Object{Array[Object{number|string}]}|function}}
 * param0 
 * @returns JSX code for rendering job list and search box
 */
const JobList = ({ jobs, findAllJobs, apply }) => {
  const [filter, setFilter] = useState("");

  /**
   * Updates filter when user types in searchbox
   * @param {Object} evt 
   */
  const handleChange = evt => {
    const { value } = evt.target;
    setFilter(value);
  };

  /**
   * Stops reloading page and gets filtered jobs
   * @param {Object} evt 
   */
  const handleSubmit = evt => {
    evt.preventDefault();
    if (!filter) {
      findAllJobs();
    }
    else {
      findAllJobs(filter);
    }
  };

  // Learned how to use react-bootstrap forms at https://react-bootstrap.github.io/components/forms/
  // Learned how to use react-bootstrap container at https://react-bootstrap.github.io/layout/grid/
  // Learned how to change padding at https://mdbootstrap.com/docs/react/utilities/spacing/
  return (
    <Container>
      <Form onSubmit={ handleSubmit }>
        <Form.Group as={ Row } controlId="formSearchBox">
          <Col xs={ 10 } className="p-0">
            <Form.Control type="text" placeholder="Enter search term..." onChange={ handleChange } value={ filter } />
          </Col>
          <Col xs={ 2 }>
            <Button variant="primary" type="submit">Submit</Button>
          </Col>
        </Form.Group>
      </Form>
      <Row>
        <Col xs={ 12 } className="p-0">
          {
            jobs.map(job => (
              <JobCard
                key={ job.id }
                job={ job }
                apply={ apply }
              />
            ))
          }
        </Col>
      </Row>
    </Container>
  );
};

export default JobList;