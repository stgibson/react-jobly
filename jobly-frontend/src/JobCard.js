import React from "react";
import Card from "react-bootstrap/Card";

/**
 * Component for rendering info of a job in a card
 * @param
 * {Object{Object{string|boolean|Object{number}}}|Object{number|string}|function}
 * param0 
 * @returns JSX code for rendering a job card
 */
const JobCard = ({ user, job, apply }) => {
  return (
    <Card data-testid={ job.id }>
      <Card.Body>
        <Card.Title>
          { job.title }
        </Card.Title>
        <Card.Text>
          { `Salary: ${job.salary ? job.salary : ""}` }
        </Card.Text>
        <Card.Text>
          { `Equity: ${job.equity ? job.equity : ""}` }
        </Card.Text>  
      </Card.Body>
    </Card>
  );
};

export default JobCard;