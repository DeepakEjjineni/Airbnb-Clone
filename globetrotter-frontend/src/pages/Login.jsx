import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import Flash from '../components/Flash';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [flashMessage, setFlashMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const from = location.state?.from?.pathname || '/listings';

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
      await login(formData);
      setFlashMessage({ message: 'Welcome Back!!', type: 'success' });
      setTimeout(() => navigate(from, { replace: true }), 1000);
    } catch (err) {
      setFlashMessage({ 
        message: err.response?.data?.error || 'Invalid credentials', 
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
                <i className="fa-solid fa-right-to-bracket"></i> Login
              </h2>
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    required
                    autoFocus
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </Form.Group>

                <Button 
                  type="submit" 
                  variant="dark" 
                  className="w-100 add-btn"
                  disabled={submitting}
                >
                  {submitting ? 'Logging in...' : 'Login'}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <small className="text-muted">
                  Don't have an account? <Link to="/signup">Sign up here</Link>
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
