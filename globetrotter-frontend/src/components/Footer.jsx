import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light border-top">
      <Container>
        <Row>
          <Col md={6}>
            <h5>
              <i className="fa-solid fa-book-atlas"></i> GlobeTrotter
            </h5>
            <p className="text-muted">
              Find your perfect stay around the world. Book unique homes and experiences.
            </p>
          </Col>
          <Col md={3}>
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/listings" className="text-decoration-none text-muted">All Places</Link></li>
              <li><Link to="/listings/new" className="text-decoration-none text-muted">Add Place</Link></li>
              <li><Link to="/about" className="text-decoration-none text-muted">About Us</Link></li>
            </ul>
          </Col>
          <Col md={3}>
            <h6>Follow Us</h6>
            <div className="d-flex gap-3">
              <a href="#" className="text-muted"><i className="fa-brands fa-facebook fa-2x"></i></a>
              <a href="#" className="text-muted"><i className="fa-brands fa-twitter fa-2x"></i></a>
              <a href="#" className="text-muted"><i className="fa-brands fa-instagram fa-2x"></i></a>
            </div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center text-muted">
            <small>&copy; 2024 GlobeTrotter. All rights reserved.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
