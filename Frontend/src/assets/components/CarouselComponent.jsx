// src/assets/components/CarouselComponent.jsx
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CarouselComponent.css'; // Import custom styles

const imageUrls = [
  "https://s3-media0.fl.yelpcdn.com/educatorphoto/qCeYjXM6N03MTsfQF6LREg/o.jpg",
  'https://static.vecteezy.com/system/resources/previews/024/581/488/non_2x/caucasian-electrician-holding-multimeter-repairing-electrical-equipment-with-expertise-generated-by-ai-free-photo.jpg',
  "https://s3-media0.fl.yelpcdn.com/educatorphoto/ccPzYQQGD-GXSUadmL3SPw/o.jpg",
  'https://static.vecteezy.com/system/resources/previews/010/508/286/non_2x/side-view-of-a-handsome-asian-electrician-repairing-an-electrical-box-with-pliers-in-the-corridor-free-photo.jpg',
  'https://static.vecteezy.com/system/resources/previews/039/896/808/large_2x/ai-generated-a-plumber-is-fixing-the-drain-in-the-bathroom-generated-by-artificial-intelligence-free-photo.jpg'
];

const CarouselComponent = () => {
  return (
      <div>
    <Carousel interval={3000} pause="false">
      {imageUrls.map((url, index) => (
        <Carousel.Item key={index}>
          <div className="carousel-image-container">
            <img
              
              src={url}
              alt={`Slide ${index + 1}`}
            />
            <Carousel.Caption className="carousel-caption-left">
              <h3>Slide {index + 1} Label</h3>
              <p>Description for slide {index + 1}.</p>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
    </div>
  );
};

export default CarouselComponent;
