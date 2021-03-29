import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import CurrentUserContext from "./CurrentUserContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

/**
 * Component for displaying home page
 * @returns JSX code for rendering the home page
 */
const Home = () => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <Container>
      <Row>
        <Col xs={ { span: 6, offset: 3 } }>
          <h1>Jobly</h1>
          <p>All the jobs in one, convenient place.</p>
          {
            currentUser ?
              <h2>{ `Welcome Back, ${currentUser.firstName}!` }</h2> :
              <Row>
                <Col>
                  <Link key={ uuid() } to="/login">
                    <Button variant="primary">Log in</Button>
                  </Link>
                </Col>
                <Col>
                  <Link key={ uuid() } to="signup">
                    <Button variant="primary">Sign up</Button>
                  </Link>
                </Col>
              </Row>
          }
        </Col>
      </Row>
    </Container>
  );
};

export default Home;