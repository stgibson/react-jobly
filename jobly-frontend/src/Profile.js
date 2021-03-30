import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import CurrentUserContext from "./CurrentUserContext";
import { useLocalStorage } from "./hooks";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

/**
 * Component for allowing users to edit their profile
 * @params {Object{function}} param0
 * @returns JSX code for rendering form for users to edit their profile
 */
const Profile = ({ editUser }) => {
  const history = useHistory();
  const [getToken] = useLocalStorage("token");
  const currentUser = useContext(CurrentUserContext);
  const [user, setUser] = useState(currentUser);
  const initFormData = {
    firstName: "",
    lastName: "",
    email: ""
  };
  const [formData, setFormData] = useState(initFormData);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [successes, setSuccesses] = useState([]);

  /**
   * Updates formData when user types in form
   * @param {Object{any}} evt 
   */
  const handleChange = evt => {
    const { id, value } = evt.target;
    setFormData(formData => ({ ...formData, [id]: value }));
  };

  /**
   * Updates password when user types in password field. This is separated
   * since it should not be passed in editUser along with the rest of the data.
   * @param {Object{any}} evt
   */
  const handlePasswordChange = evt => {
    const { value } = evt.target;
    setPassword(value);
  };

  /**
   * Edits user and resets confirm password field to be blank
   * @param {Object{any}} evt 
   */
  const handleSubmit = async evt => {
    evt.preventDefault();
    const { errors } = await editUser(formData, password);
    if (errors.length) {
      setErrors(errors);
    }
    else {
      setPassword("");
      setErrors([]);
      setSuccesses(["Updated successfully."]);
    }
  };

  // on 1st render, verify user is logged in, otherwise redirect to login page
  useEffect(() => {
    if (!getToken()) {
      history.push("/login");
    }
  }, []);

  // if context changes, update user
  useEffect(() => {
    setUser(currentUser);
  }, [currentUser])

  // if user changes, update formData
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      });
    }
  }, [user])

  return (
    <Container>
      <div>
        <Row>
          <Col xs={ { span: 6, offset: 3 } }>
            <h3>Profile</h3>
            <Form onSubmit={ handleSubmit }>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Text>{ user ? user.username : "" }</Form.Text>
              </Form.Group>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={ handleChange }
                  value={ formData.firstName }
                />
              </Form.Group>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
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
              <Form.Group controlId="password">
                <Form.Label>Confirm password to make changes:</Form.Label>
                <Form.Control
                  type="password"
                  onChange={ handlePasswordChange }
                  value={ password }
                />
              </Form.Group>
              {
                errors.map(error => (
                  <Alert key={ uuid() } variant="danger">{ error }</Alert>
                ))
              }
              {
                successes.map(success => (
                  <Alert key={ uuid() } variant="success">{ success }</Alert>
                ))
              }
              <Button variant="primary" type="submit">Save Changes</Button>
            </Form>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Profile;