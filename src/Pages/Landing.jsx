import React from 'react';
import './Landing.css';
import { Row, Col } from 'react-bootstrap';
import img1 from '../assets/img1.png';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

function Landing() {
  return (
    <div className="Landing">
      <Row>
        {/* Text content */}
        <Col sm={12} md={6} lg={6} className="content-section">
          <h1>Manage Your Workforce Efficiently</h1>
          <p>
          Easily add, update, and organize employee details. Stay on top of your team's information
          with seamless management features built to simplify your workflow.
          </p>
          <Link to='/home'  className="view-button">
            View Employees
          </Link>
        </Col>

        {/* Image section */}
        <Col sm={12} md={6} lg={6} className="image-section">
          <img src={img1} alt="Employee illustration" className="landing-image" />
        </Col>
      </Row>
    </div>
  );
}

export default Landing;
