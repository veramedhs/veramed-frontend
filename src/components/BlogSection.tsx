import React from "react";
import Slider from "react-slick";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img03.png";

const BlogSection: React.FC = () => {
  
    const settings = {
      dots: true,
      infinite: true,
      speed: 800,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    };
  
    return (
      <div
        id="blog"
        style={{
          background: "lightyellow",
          padding: "2rem",
          fontSize: "1.5rem",
          color: "black",
        }}
      >
        <h2 className="text-center mb-4">📰 Blog Highlights</h2>
        <Slider {...settings}>
          <div>
            <img src={img1} alt="Blog 1" className="w-full h-auto rounded-md" />
            <p className="mt-2 text-center">Robotic Surgery: A New Era in Healing</p>
            
          </div>
          <div>
            <img src={img2} alt="Blog 2" className="w-full h-auto rounded-md" />
            <p className="mt-2 text-center">Precision and Recovery with Robotic Urology</p>
          </div>
          
        </Slider>
      </div>
      
    );
  };
  
  export default BlogSection;
