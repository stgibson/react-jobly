import React, { useState, useContext, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CurrentUserContext from "./CurrentUserContext";

/**
 * Component for rendering info of a job in a card
 * @param
 * {Object{Object{number|string}|function}}
 * param0 
 * @returns JSX code for rendering a job card
 */
const JobCard = ({ job, apply }) => {
  const [applied, setApplied] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const [user, setUser] = useState(currentUser);

  /**
   * Checks if currentUser applied for this job
   */
  const checkIfApplied = () => {
    if (user && user.applications.find(jobId => jobId === job.id)) {
      setApplied(true);
    }
  };

  /**
   * Applies for job and updates text in button appropriately
   */
  const applyForJob = () => {
    apply(job.id);
    setApplied(true);
  };

  // if context changes, update user
  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  // if user changes, update application status
  useEffect(() => {
    checkIfApplied();
  }, [user]);

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
        {
          applied ?
            <Button variant="danger" disabled>APPLIED</Button> :
            <Button variant="danger" onClick={ applyForJob }>APPLY</Button>            
        }
      </Card.Body>
    </Card>
  );
};

export default JobCard;