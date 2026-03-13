import api from './api';

export const listingService = {
  // Get all listings
  getAllListings: async () => {
    return api.get('/listings');
  },

  // Get single listing by ID
  getListing: async (id) => {
    return api.get(`/listings/${id}`);
  },

  // Create new listing
  createListing: async (formData) => {
    return api.post('/listings', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  // Update listing
  updateListing: async (id, formData) => {
    return api.put(`/listings/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  // Delete listing
  deleteListing: async (id) => {
    return api.delete(`/listings/${id}`);
  }
};