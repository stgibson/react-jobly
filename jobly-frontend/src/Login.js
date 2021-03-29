import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

/**
 * Component for displaying form for user to log in
 * @param {Object{function}} param0 
 * @returns JSX code for rendering login form
 */
const Login = ({ login }) => {
  const history = useHistory();
  const initFormData = { username: "", password: "" };
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
    const { errors } = await login(formData)
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
            <h3>Log In</h3>
            <Form onSubmit={ handleSubmit }>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" onChange={ handleChange } value={ formData.username } />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={ handleChange }  value={ formData.password } />
              </Form.Group>
              { errors.map(error => <Alert variant="danger">{ error }</Alert>) }
              <Button variant="primary" type="submit">Submit</Button>
            </Form>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Login;