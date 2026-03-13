import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import Flash from '../components/Flash';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [flashMessage, setFlashMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await signup(formData);
      setFlashMessage({ message: 'Welcome to GlobeTrotter!!', type: 'success' });
      setTimeout(() => navigate('/listings'), 1000);
    } catch (err) {
      setFlashMessage({ 
        message: err.response?.data?.error || 'Failed to create account', 
        type: 'danger' 
      });
      setSubmitting(false);
    }
  };

  return (
    <Container className="my-5">
      {flashMessage && (
        <Flash 
          message={flashMessage.message} 
          type={flashMessage.type} 
          onClose={() => setFlashMessage(null)} 
        />
      )}

      <Row>
        <Col md={6} className="offset-md-3">
          <Card>
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">
                <i className="fa-solid fa-user-plus"></i> Sign Up
              </h2>
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Choose a username"
                    required
                    autoFocus
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Choose a strong password"
                    required
                    minLength={6}
                  />
                  <Form.Text className="text-muted">
                    Password must be at least 6 characters
                  </Form.Text>
                </Form.Group>

                <Button 
                  type="submit" 
                  variant="dark" 
                  className="w-100 add-btn"
                  disabled={submitting}
                >
                  {submitting ? 'Creating account...' : 'Sign Up'}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <small className="text-muted">
                  Already have an account? <Link to="/login">Login here</Link>
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
