import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Grid, Typography, Button } from "@mui/material";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/photos?_limit=8");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container my-5">
      <Typography variant="h3" color="warning" align="center" gutterBottom>
        Our Home Products
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary" paragraph>
        Discover our range of comfortable and stylish home furniture.
      </Typography>

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} key={product.id}>
            <Card
              sx={{
                display: "flex",
                height: "auto",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CardMedia
                component="img"
                image={product.url}
                alt={product.title}
                sx={{ width: "40%", height: "250px", objectFit: "cover" }}
              />
              <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "60%" }}>
                <Typography variant="h6" fontWeight="bold">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Sample description for the product.
                </Typography>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
                  <Button variant="contained" color="warning" disabled>
                    View Details
                  </Button>
                  <Typography variant="body1" color="primary" fontWeight="bold">
                    Rs. 1000
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductGrid;
