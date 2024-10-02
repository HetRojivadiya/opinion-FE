import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the default styles

// Import images
import Image1 from '../../assets/Home/Carousel/1.png';
import Image2 from '../../assets/Home/Carousel/2.png';
import Image3 from '../../assets/Home/Carousel/3.png';
import Image4 from '../../assets/Home/Carousel/4.png';

// Define the image size class
const imageStyle = {
  width: '100%',
  height: '250px', // Adjust height as needed
  objectFit: 'cover' // Ensures the image covers the container without distortion
};

const ImageCarousel = () => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      interval={3000} // Change image every 3 seconds
      showThumbs={false}
      showStatus={false}
      showArrows={false}
      className="rounded-lg shadow-lg"
    >
      <div>
        <img src={Image1} alt="Carousel slide 1" style={imageStyle} />
      </div>
      <div>
        <img src={Image2} alt="Carousel slide 2" style={imageStyle} />
      </div>
      <div>
        <img src={Image3} alt="Carousel slide 3" style={imageStyle} />
      </div>
      <div>
        <img src={Image4} alt="Carousel slide 4" style={imageStyle} />
      </div>
    </Carousel>
  );
};

export default ImageCarousel;
