import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import CompanyCard from "./CompanyCard";
import "./CompanyList.css";

/**
 * Component for showing list of companies and search box for filtering
 * companies
 * @param {Object{Array[Object{string|number}]|function}} param0 
 * @returns JSX code for rendering company list
 */
const CompanyList = ({ companies, findAllCompanies }) => {
  const [filter, setFilter] = useState("");

  /**
   * Updates filter when user types in searchbox
   * @param {Object{any}} evt 
   */
  const handleChange = evt => {
    const { value } = evt.target;
    setFilter(value);
  };

  /**
   * Stops reloading page and gets filtered companies
   * @param {Object{any}} evt 
   */
  const handleSubmit = evt => {
    evt.preventDefault();
    if (!filter) {
      findAllCompanies();
    }
    else {
      findAllCompanies(filter);
    }
  };

  // Learned how to use react-bootstrap forms at https://react-bootstrap.github.io/components/forms/
  // Learned how to use react-bootstrap container at https://react-bootstrap.github.io/layout/grid/
  // Learned how to change padding at https://mdbootstrap.com/docs/react/utilities/spacing/
  return (
    <Container className="CompanyList">
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
            companies.map(company => (
              <Link to={ `companies/${company.handle}` }>
                <CompanyCard key={ company.handle } company={ company } />
              </Link>
            ))
          }
        </Col>
      </Row>
    </Container>
  );
};

export default CompanyList;