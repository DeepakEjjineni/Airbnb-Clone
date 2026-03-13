import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { listingService } from '../services/listingService';
import Flash from '../components/Flash';

const NewListing = () => {
  const navigate = useNavigate();
  const [flashMessage, setFlashMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    country: '',
    image: null
  });

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

      await listingService.createListing(formDataToSend);
      setFlashMessage({ message: 'New Place Added', type: 'success' });
      setTimeout(() => navigate('/listings'), 1500);
    } catch (err) {
      setFlashMessage({ 
        message: err.response?.data?.error || 'Failed to create listing', 
        type: 'danger' 
      });
      setSubmitting(false);
    }
  };

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
          <h2 className="mb-4">Create New Listing</h2>
          
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit} className="needs-validation">
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter listing title"
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
                    placeholder="Enter description"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    Upload a photo of your place
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Price (per night)</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="1200"
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
                    placeholder="Paris, Mumbai, Tokyo..."
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
                    placeholder="India, USA, France..."
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
                    {submitting ? 'Creating...' : 'Add Listing'}
                  </Button>
                  <Button 
                    type="button"
                    variant="secondary"
                    onClick={() => navigate('/listings')}
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

export default NewListing;
