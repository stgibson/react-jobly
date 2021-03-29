import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

/**
 * Component for displaying form for user to create an account
 * @param {Object{function}} param0 
 * @returns JSX code for rendering sign up form
 */
const Signup = ({ signup }) => {
  const history = useHistory();
  const initFormData = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  };
  const [formData, setFormData] = useState(initFormData);
  const [errors, setErrors] = useState([]);
  
  /**
   * Updates formData when user types in form
   * @param {Object{any}} evt 
   */
  const handleChange = evt => {
    const { id, value } = evt.target;
    setFormData(formData => ({ ...formData, [id]: value }));
  };

  /**
   * Logs in user and redirects to companies page
   * @param {Object{any}} evt 
   */
  const handleSubmit = async evt => {
    evt.preventDefault();
    const { errors } = await signup(formData)
    if (errors.length) {
      setErrors(errors);
    }
    else {
      history.push("/companies");
    }
  };

  return (
    <Container>
      <div>
        <Row>
          <Col xs={ { span: 6, offset: 3 } }>
            <h3>Sign Up</h3>
            <Form onSubmit={ handleSubmit }>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  onChange={ handleChange }
                  value={ formData.username }
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={ handleChange }
                  value={ formData.password }
                />
              </Form.Group>
              <Form.Group controlId="firstName">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={ handleChange }
                  value={ formData.firstName }
                />
              </Form.Group>
              <Form.Group controlId="lastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={ handleChange }
                  value={ formData.lastName }
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  onChange={ handleChange }
                  value={ formData.email }
                />
              </Form.Group>
              {
                errors.map(error => (
                  <Alert key={ uuid() } variant="danger">{ error }</Alert>
                ))
              }
              <Button variant="primary" type="submit">Submit</Button>
            </Form>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Signup;