import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Slider = ({ images }) => {
  const containerStyle = {
    maxWidth: "500px",
    maxHeight: "300px",
    margin: "0 auto",
  };

  return (
    <div style={containerStyle}>
      <Carousel autoPlay infiniteLoop showThumbs={false} width="100%">
        {images?.map((image, index) => (
          <div key={images}>
            <img
              className="slider-img"
              // src={images}
              src={`http://localhost:5000/uploads/${image}`}
              alt={`Slide ${index}`}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
