import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Container, Nav, Navbar as BSNavbar, Button, Form, InputGroup } from 'react-bootstrap';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/listings');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <BSNavbar expand="md" className="bg-body-light sticky-top border-bottom">
      <Container fluid>
        <BSNavbar.Brand as={Link} to="/">
          <i className="fa-solid fa-book-atlas">&nbsp;&nbsp;GLOBETROTTER</i>
        </BSNavbar.Brand>
        
        <BSNavbar.Toggle aria-controls="navbarNavAltMarkup" />
        
        <BSNavbar.Collapse id="navbarNavAltMarkup">
           
          <Form className="d-flex ms-auto" role="search" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search for Destination"
              className="me-2 search-bar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="dark" className="add-btn" type="submit">Search</Button>
          </Form>
          
          <div className="ms-auto d-flex gap-2">
            <Nav.Link as={Link} to="/listings">All Places</Nav.Link>
            {!isAuthenticated ? (
              <>
                <Button as={Link} to="/signup" variant="dark" className="add-btn">Sign Up</Button>
                <Button as={Link} to="/login" variant="dark" className="add-btn">Login</Button>
              </>
            ) : (
              <Button variant="danger" onClick={handleLogout}>Logout</Button>
            )}
          </div>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;
