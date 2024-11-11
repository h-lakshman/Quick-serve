import React, { useState } from 'react';
import { Box, Card, CardMedia, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const images = [
  { src: 'https://images.unsplash.com/photo-1704475517731-7575f517b800?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWxlY3RyaWNpYW58ZW58MHx8MHx8fDA%3D' },
  { src: 'https://images.unsplash.com/photo-1682345262055-8f95f3c513ea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGVsZWN0cmljaWFufG' },
  { src: 'https://images.unsplash.com/photo-1617571607645-dd7dd3bf7f6b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGVsZWN0cmljaWFufGVufDB8fDB8fHww' },
];

const MuiCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <IconButton
        onClick={handlePrev}
        aria-label="Previous slide"
        sx={{ position: 'absolute', top: '40%', left: '16px', zIndex: 1, transform: 'translateY(-50%)', color: 'white' }}
      >
        <ArrowBackIcon fontSize="large" />
      </IconButton>

      <Card sx={{ width: '100%', height: 450, boxShadow: 'none' }}>
        <CardMedia
          component="img"
          image={images[currentIndex].src}
          alt={`Slide ${currentIndex + 1}`}
          sx={{ width: '100%', height: '100%' }}
        />
      </Card>

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '25%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '200px',
          backgroundPosition: 'center',
          opacity: 1,
          zIndex: 2,
          
        }}
      >
        <Box sx={{ color: 'white'}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt illo quod beatae voluptates, labore nesciunt iure ipsam vitae repudiandae? Totam veritatis dolor similique recusandae ipsa voluptas itaque vitae aperiam ullam!
        </Box>
      </Box>

      <IconButton
        onClick={handleNext}
        aria-label="Next slide"
        sx={{ position: 'absolute', top: '40%', right: '16px', zIndex: 1, transform: 'translateY(-50%)', color: 'white' }}
      >
        <ArrowForwardIcon fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default MuiCarousel;
