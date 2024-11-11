import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Rating, Paper, Avatar } from "@mui/material";
import { useParams } from "react-router-dom";

const ReviewForm = () => {
    const { slug } = useParams();
    const [reviewText, setReviewText] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [reviews, setReviews] = useState([]);
    const [userRating, setUserRating] = useState(1);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/services/${slug}/reviews/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': localStorage.getItem('token'),
                    },
                });
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
                setError("Failed to load reviews. Please try again.");
            }
        };

        fetchReviews();
    }, [slug]);

    const handleSubmit = async () => {
        if (!reviewText) {
            alert("Please fill in all fields!");
            return;
        }

        // Ensure token is available
        const token = localStorage.getItem('token');
        if (!token) {
            alert("You must be logged in to submit a review.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            // Submit the new review to the backend
            const response = await fetch(`http://127.0.0.1:8000/api/services/${slug}/reviews/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
                },
                body: JSON.stringify({
                    review: reviewText,
                    rating: userRating,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.detail || "Failed to submit review. Please try again.");
                return;
            }

            // Refresh the reviews
            const reviewResponse = await fetch(`http://127.0.0.1:8000/api/services/${slug}/reviews/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
                },
            });
            const reviewData = await reviewResponse.json();
            setReviews(reviewData);

            // Reset form fields
            setUserRating(0);
            setReviewText("");
            alert("Review submitted successfully!");
        } catch (error) {
            console.error("Error submitting review:", error);
            setError("Failed to submit review. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleRatingChange = (newRating) => {
        setUserRating(newRating);
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
            {/* Rating Input */}
            <Typography variant="h6" sx={{ marginBottom: "12px" }}>Write a Review</Typography>
            <Rating value={userRating} onChange={(e, newValue) => handleRatingChange(newValue)} sx={{ marginBottom: "12px" }} />
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

            {/* Displaying Reviews */}
            <Box sx={{ marginTop: "30px" }}>
                <Typography variant="h6" sx={{ marginBottom: "12px" }}>Reviews</Typography>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <Paper key={review.id} sx={{ padding: "16px", marginBottom: "12px", display: "flex", alignItems: "flex-start" }}>
                            <Avatar sx={{ marginRight: "12px" }}>{review.full_name[0]}</Avatar>
                            <Box>
                                <Typography variant="h6">{review.full_name}</Typography>
                                <Typography variant="body2" color="textSecondary">{review.created_at}</Typography>
                                <Rating value={review.rating} readOnly sx={{ marginBottom: "8px" }} />
                                <Typography variant="body2">{review.review}</Typography>
                            </Box>
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
