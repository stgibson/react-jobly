import React from "react";
import Card from "react-bootstrap/Card";

/**
 * Component for rendering info of a job in a card
 * @param {Object{Object{string|boolean|Object{number}}}|function} param0 
 * @returns JSX code for rendering a job card
 */
const JobCard = ({ user, job, apply }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          { job.title }
        </Card.Title>
        <Card.Text>
          <div>{ `Salary: ${job.salary}` }</div>
          <div>{ `Equity: ${job.equity}` }</div>
          </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default JobCard;