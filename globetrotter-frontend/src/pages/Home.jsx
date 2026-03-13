import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <div className="home-page">
      <div 
        className="hero-section text-white text-center d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '70vh'
        }}
      >
        <Container>
          <h1 className="display-3 fw-bold mb-4">
            <i className="fa-solid fa-book-atlas"></i> Welcome to GlobeTrotter
          </h1>
          <p className="lead mb-4">
            Discover unique places to stay around the world. Your next adventure starts here.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Button 
              as={Link} 
              to="/listings" 
              variant="light" 
              size="lg"
              className="px-5"
            >
              Explore Places
            </Button>
            <Button 
              as={Link} 
              to="/listings/new" 
              variant="outline-light" 
              size="lg"
              className="px-5"
            >
              List Your Place
            </Button>
          </div>
        </Container>
      </div>

      <Container className="my-5">
        <h2 className="text-center mb-5">Why Choose GlobeTrotter?</h2>
        <div className="row g-4">
          <div className="col-md-4 text-center">
            <i className="fa-solid fa-globe fa-4x text-primary mb-3"></i>
            <h4>Worldwide Destinations</h4>
            <p className="text-muted">
              From cozy cottages to luxury villas, find the perfect place anywhere in the world.
            </p>
          </div>
          <div className="col-md-4 text-center">
            <i className="fa-solid fa-shield-halved fa-4x text-success mb-3"></i>
            <h4>Secure Booking</h4>
            <p className="text-muted">
              Book with confidence. All listings are verified and secure.
            </p>
          </div>
          <div className="col-md-4 text-center">
            <i className="fa-solid fa-star fa-4x text-warning mb-3"></i>
            <h4>Trusted Reviews</h4>
            <p className="text-muted">
              Read genuine reviews from travelers who have stayed there before.
            </p>
          </div>
        </div>
      </Container>

      <div className="bg-light py-5 mt-5">
        <Container className="text-center">
          <h3 className="mb-4">Ready to start your journey?</h3>
          <Button as={Link} to="/signup" variant="dark" size="lg" className="add-btn px-5">
            Sign Up Now
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default Home;
