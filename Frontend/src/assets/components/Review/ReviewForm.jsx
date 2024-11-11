import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Rating, Paper } from "@mui/material";
import axios from "axios";

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState([]);

  // Fetch reviews from JSON server on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/reviews");
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Failed to load reviews. Please try again.");
      }
    };

    fetchReviews();
  }, []);

  // Handle review submission to JSON server
  const handleSubmit = async () => {
    if (!reviewText) {
      alert("Please fill in all fields!");
      return;
    }

    const newReview = {
      id: reviews.length + 1, // Generate a new id
      userName: "Anonymous",
      rating,
      reviewText,
    };

    try {
      setLoading(true);
      setError("");

      // Submit the new review to the JSON server
      await axios.post("http://localhost:5000/reviews", newReview);
      
      // Update the reviews array with the new review
      setReviews([newReview, ...reviews]);

      // Reset form fields
      setRating(0);
      setReviewText("");
      alert("Review submitted successfully!");

    } catch (error) {
      console.error("Error submitting review:", error);
      setError("Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "95%",
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "24px",
        margin: "auto",
        boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
        marginBottom: "20px",
      }}
    >
      {/* Write a Review form at the top */}
      <Typography variant="h6" sx={{ marginBottom: "12px" }}>
        Write a Review
      </Typography>
      <TextField
        fullWidth
        label="Your Review"
        multiline
        rows={4}
        variant="outlined"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        sx={{ marginBottom: "12px" }}
      />
      
      {error && (
        <Typography variant="body2" color="error" sx={{ marginBottom: "12px" }}>
          {error}
        </Typography>
      )}
      <Button
        variant="contained"
        sx={{
          fontWeight: "bold",
          backgroundColor: "rgba(250,22,22,1)",
          "&:hover": { backgroundColor: "rgba(215,22,22,1)" },
        }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Review"}
      </Button>

      {/* Displaying the fetched reviews below */}
      <Box sx={{ marginTop: "30px" }}>
        <Typography variant="h6" sx={{ marginBottom: "12px" }}>
          Reviews
        </Typography>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Paper key={review.id} sx={{ padding: "16px", marginBottom: "12px" }}>
              <Typography variant="h6">{review.userName}</Typography>
              <Rating value={review.rating} readOnly sx={{ marginBottom: "8px" }} />
              <Typography variant="body2" sx={{ marginBottom: "8px" }}>
                {review.reviewText}
              </Typography>
            </Paper>
          ))
        ) : (
          <Typography variant="body2">No reviews yet.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ReviewForm;
