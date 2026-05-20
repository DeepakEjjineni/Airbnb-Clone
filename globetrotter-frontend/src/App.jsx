import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Listings from './pages/Listings';
import ListingDetails from './pages/ListingDetails';
import NewListing from './pages/NewListing';
import EditListing from './pages/EditListing';
import Error from './pages/Error';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/listings/:id" element={<ListingDetails />} />
              <Route 
                path="/listings/new" 
                element={
                  <ProtectedRoute>
                    <NewListing />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/listings/:id/edit" 
                element={
                  <ProtectedRoute>
                    <EditListing />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Error />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;                                                                                                                                                                                   