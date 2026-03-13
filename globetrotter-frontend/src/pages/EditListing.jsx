import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Spinner } from 'react-bootstrap';
import { listingService } from '../services/listingService';
import Flash from '../components/Flash';

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flashMessage, setFlashMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    country: '',
    image: null
  });
  const [existingImage, setExistingImage] = useState('');

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      const response = await listingService.getListing(id);
      const listing = response.data.listing || response.data;
      setFormData({
        title: listing.title,
        description: listing.description || '',
        price: listing.price,
        location: listing.location,
        country: listing.country,
        image: null
      });
      setExistingImage(listing.image?.url || listing.image);
      setLoading(false);
    } catch (err) {
      setFlashMessage({
        message: err.response?.data?.error || 'Failed to load listing',
        type: 'danger'
      });
      setTimeout(() => navigate('/listings'), 2000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('listing[title]', formData.title);
      formDataToSend.append('listing[description]', formData.description);
      formDataToSend.append('listing[price]', formData.price);
      formDataToSend.append('listing[location]', formData.location);
      formDataToSend.append('listing[country]', formData.country);
      
      if (formData.image) {
        formDataToSend.append('listing[image]', formData.image);
      }

      await listingService.updateListing(id, formDataToSend);
      setFlashMessage({ message: 'Changes applied to details', type: 'success' });
      setTimeout(() => navigate(`/listings/${id}`), 1500);
    } catch (err) {
      setFlashMessage({ 
        message: err.response?.data?.error || 'Failed to update listing', 
        type: 'danger' 
      });
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="primary" />
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

      <Row>
        <Col md={8} className="offset-md-2">
          <h2 className="mb-4">Edit Listing</h2>
          
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Form.Group>

                {existingImage && (
                  <div className="mb-3">
                    <Form.Label>Current Image</Form.Label>
                    <div>
                      <img 
                        src={existingImage} 
                        alt="Current listing" 
                        style={{ maxWidth: '200px', borderRadius: '8px' }}
                      />
                    </div>
                  </div>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>Upload New Image (optional)</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <Form.Text className="text-muted">
                    Leave empty to keep current image
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Price (per night)</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button 
                    type="submit" 
                    variant="dark" 
                    className="add-btn"
                    disabled={submitting}
                  >
                    {submitting ? 'Updating...' : 'Update Listing'}
                  </Button>
                  <Button 
                    type="button"
                    variant="secondary"
                    onClick={() => navigate(`/listings/${id}`)}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditListing;
