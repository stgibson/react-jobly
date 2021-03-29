import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import JobCard from "./JobCard";

/**
 * Component for displaying company details and list of company's jobs
 * @param {Object{function}} param0 
 * @returns JSX code for rendering company details and jobs
 */
const CompanyDetail = ({ getCompany, apply }) => {
  const [company, setCompany] = useState({});

  const { handle } = useParams();

  // set company using handle from url params
  useEffect(() => {
    const updateCompany = async () => {
      const currCompany = await getCompany(handle);
      setCompany(currCompany);
    }
    updateCompany();
  }, [handle, getCompany]);

  return (
    <Container>
      <h4>{ company.name }</h4>
      <p>{ company.description }</p>
      {
        company.jobs &&
          company.jobs.map(job => (
            <JobCard
              key={ job.id }
              job={ job }
              apply={ apply }
            />
          ))
      }
    </Container>
  );
};

export default CompanyDetail;