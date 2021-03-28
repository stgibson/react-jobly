import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/**
 * Component for showing info on a company in a card
 * @param {Object{Object{string|number|Object{number|string}}}} param0
 * @returns JSX code for rendering company card
 */
const CompanyCard = ({ company }) => {
  // Learned how to use local image at https://www.freecodecamp.org/news/react-background-image-tutorial-how-to-set-backgroundimage-with-inline-css-style/
  return (
    <Card data-testid={ company.handle }>
      <Card.Body>
        <Card.Title>
          <Row>
            <Col xs={ 10 }>
              { company.name }
            </Col>
            {
              company.logoUrl &&
              <Col xs={ 2 }>
                <div
                  style={
                    { width: "50px", content: `url(${company.logoUrl})` }
                  }
                  data-testid={ company.logoUrl }
                >
                  &nbsp;
                </div>
              </Col>
            }
          </Row>
        </Card.Title>
        <Card.Text>{ company.description }</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CompanyCard;