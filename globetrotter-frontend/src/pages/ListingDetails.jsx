import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Spinner } from 'react-bootstrap';
import { listingService } from '../services/listingService';
import { reviewService } from '../services/reviewService';
import { useAuth } from '../context/AuthContext';
import Flash from '../components/Flash';

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flashMessage, setFlashMessage] = useState(null);
  const [reviewForm, setReviewForm] = useState({ rating: 3, comment: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      const response = await listingService.getListing(id);
      setListing(response.data.listing || response.data);
      setLoading(false);
    } catch (err) {
      setFlashMessage({
        message: err.response?.data?.error || 'Listing not found',
        type: 'danger'
      });
      setTimeout(() => navigate('/listings'), 2000);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await listingService.deleteListing(id);
        setFlashMessage({ message: 'Place Deleted', type: 'success' });
        setTimeout(() => navigate('/listings'), 1500);
      } catch (err) {
        setFlashMessage({ 
          message: err.response?.data?.error || 'Failed to delete', 
          type: 'danger' 
        });
      }
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setFlashMessage({ message: 'Please login to add a review', type: 'danger' });
      return;
    }

    setSubmitting(true);
    try {
      await reviewService.createReview(id, { review: reviewForm });
      setFlashMessage({ message: 'New Review Added', type: 'success' });
      setReviewForm({ rating: 3, comment: '' });
      fetchListing(); 
    } catch (err) {
      setFlashMessage({ 
        message: err.response?.data?.error || 'Failed to add review', 
        type: 'danger' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await reviewService.deleteReview(id, reviewId);
        setFlashMessage({ message: 'Review Deleted', type: 'success' });
        fetchListing();
      } catch (err) {
        setFlashMessage({ 
          message: err.response?.data?.error || 'Failed to delete review', 
          type: 'danger' 
        });
      }
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (!listing) return null;

  const isOwner = user && listing.owner && (user._id === listing.owner._id || user.id === listing.owner._id);

  return (
    <Container className="my-4">
      {flashMessage && (
        <Flash 
          message={flashMessage.message} 
          type={flashMessage.type} 
          onClose={() => setFlashMessage(null)} 
        />
      )}

      <Row className="mt-3">
        <Col lg={8} className="offset-lg-2">
          <h2>{listing.title} Details:</h2>
          
          <Card className="show-card">
            <Card.Img 
              variant="top" 
              src={listing.image?.url || listing.image} 
              className="showpage-img" 
              alt={listing.title} 
            />
            <Card.Body>
              <Card.Text>
                <b>{listing.title}</b>&nbsp;&nbsp;
                Owned by&nbsp;&nbsp;
                <b>{listing.owner?.username || 'Unknown'}</b>
                <br /><br />
                {listing.description}<br />
                ₹ {listing.price.toLocaleString('en-IN')}<br />
                {listing.location}<br />
                {listing.country}<br /><br />
              </Card.Text>
            </Card.Body>
          </Card>

          {isOwner && (
            <div className="showbtns mb-2">
              <Button 
                as={Link} 
                to={`/listings/${id}/edit`} 
                variant="dark" 
                className="add-btn"
              >
                Edit
              </Button>
              <Button 
                variant="dark" 
                onClick={handleDelete}
                className="ms-3"
              >
                Delete
              </Button>
            </div>
          )}

          <hr />

          {/* Review submission */}
          <div className="col-8 offset-2 mb-4">
            <h4>Leave your Valuable Review here !!</h4>
            <Form onSubmit={handleReviewSubmit} className="needs-validation">
              <Form.Group className="mt-4 mb-3">
                <Form.Label htmlFor="rating">Rating</Form.Label>
                <Form.Range
                  id="rating"
                  min="1"
                  max="5"
                  value={reviewForm.rating}
                  onChange={(e) => setReviewForm({ ...reviewForm, rating: e.target.value })}
                />
                <div className="text-center">
                  <span className="badge bg-primary">{reviewForm.rating} ⭐</span>
                </div>
              </Form.Group>

              <Form.Group className="mt-4 mb-3">
                <Form.Label htmlFor="comment">Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  id="comment"
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  required
                />
              </Form.Group>

              <Button 
                type="submit" 
                variant="dark" 
                className="add-btn mt-4 mb-3"
                disabled={submitting || !isAuthenticated}
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </Button>
              {!isAuthenticated && (
                <p className="text-muted small mt-2">
                  Please <Link to="/login">login</Link> to leave a review
                </p>
              )}
            </Form>
          </div>

          {/* Review member list */}
          <Row>
            {listing.review && listing.review.length > 0 ? (
              listing.review.map((r) => (
                <Col key={r._id} md={5} className="mb-3 ms-4">
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        {r.author?.username || 'Anonymous User'}
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {r.rating} ⭐
                      </Card.Subtitle>
                      <Card.Text>{r.comment}</Card.Text>
                      {user && r.author && (user._id === r.author._id || user.id === r.author._id) && (
                        <Button 
                          variant="dark" 
                          size="sm"
                          onClick={() => handleDeleteReview(r._id)}
                        >
                          Delete
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col className="text-center my-3">
                <p className="text-muted">No reviews yet. Be the first to review!</p>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ListingDetails;
