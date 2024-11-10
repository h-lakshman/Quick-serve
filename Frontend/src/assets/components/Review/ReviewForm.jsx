import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Rating, Paper } from "@mui/material";
import axios from "axios"; // Import Axios

const ReviewForm = ({ onReviewSubmit }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false); // To show loading state
  const [error, setError] = useState(""); // To handle errors
  const [reviews, setReviews] = useState([]); // To store the fetched reviews

  // Fetch reviews from API on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("https://yourapi.com/reviews"); // Replace with your API URL
        setReviews(response.data); // Assuming the API returns an array of reviews
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Failed to load reviews. Please try again.");
      }
    };

    fetchReviews();
  }, []); // Empty dependency array ensures this only runs on mount

  // Handle review submission to the API
  const handleSubmit = async () => {
    if (rating === 0 || !reviewText) {
      alert("Please fill in all fields!");
      return;
    }

    const newReview = {
      userName: "Anonymous", // Assuming a generic username for now
      rating,
      reviewText,
    };

    try {
      setLoading(true);
      setError(""); // Reset previous error (if any)

      // Replace with your API endpoint to submit the review
      await axios.post("https://yourapi.com/reviews", newReview);
      
      // Update the reviews after submission
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
      {/* Displaying the fetched reviews at the top */}
      <Box sx={{ marginBottom: "30px" }}>
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

      {/* Add Review form at the bottom */}
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
      <Box sx={{ marginBottom: "12px" }}></Box>
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
        disabled={loading} // Disable the button while the request is in progress
      >
        {loading ? "Submitting..." : "Submit Review"}
      </Button>
    </Box>
  );
};

export default ReviewForm;
