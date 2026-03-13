import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { listingService } from '../services/listingService';
import Flash from '../components/Flash';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flashMessage, setFlashMessage] = useState(null);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await listingService.getAllListings();
      setListings(response.data.listings || response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load listings');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading amazing places...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center my-5">
        <i className="fa-solid fa-exclamation-triangle fa-3x text-danger mb-3"></i>
        <h3>Oops! Something went wrong</h3>
        <p className="text-muted">{error}</p>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      {flashMessage && (
        <Flash 
          message={flashMessage.message} 
          type={flashMessage.type} 
          onClose={() => setFlashMessage(null)} 
        />
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>All Places</h2>
        <Link to="/listings/new" className="btn btn-dark add-btn">
          <i className="fa-solid fa-plus"></i> Add New Place
        </Link>
      </div>

      {listings.length === 0 ? (
        <div className="text-center my-5">
          <i className="fa-solid fa-map-location-dot fa-4x text-muted mb-3"></i>
          <h4>No listings available yet</h4>
          <p className="text-muted">Be the first to add a place!</p>
          <Link to="/listings/new" className="btn btn-dark add-btn">
            Add Your Place
          </Link>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {listings.map((listing) => (
            <Col key={listing._id}>
              <Link to={`/listings/${listing._id}`} className="text-decoration-none">
                <Card className="h-100 listing-card">
                  <Card.Img
                    variant="top"
                    src={listing.image?.url || listing.image}
                    alt={listing.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title className="text-dark">{listing.title}</Card.Title>
                    <Card.Text className="text-muted small">
                      <i className="fa-solid fa-location-dot"></i> {listing.location}, {listing.country}
                    </Card.Text>
                    <Card.Text className="text-dark fw-bold">
                      ₹ {listing.price.toLocaleString('en-IN')} / night
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Listings;
