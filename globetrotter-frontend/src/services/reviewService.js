import api from './api';

export const reviewService = {
  // Create new review
  createReview: async (listingId, reviewData) => {
    return api.post(`/listings/${listingId}/reviews`, reviewData);
  },

  // Delete review
  deleteReview: async (listingId, reviewId) => {
    return api.delete(`/listings/${listingId}/reviews/${reviewId}`);
  }
};