import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const Error = () => {
  return (
    <Container className="text-center my-5">
      <div className="py-5">
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <h2 className="mb-4">Oops! Page Not Found</h2>
        <p className="lead text-muted mb-4">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <i className="fa-solid fa-map-location-dot fa-5x text-muted mb-4"></i>
        <div className="mt-4">
          <Button 
            as={Link} 
            to="/listings" 
            variant="dark" 
            size="lg" 
            className="add-btn me-3"
          >
            <i className="fa-solid fa-home"></i> Go to Listings
          </Button>
          <Button 
            as={Link} 
            to="/" 
            variant="outline-dark" 
            size="lg"
          >
            <i className="fa-solid fa-arrow-left"></i> Go Home
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Error;
