import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const images = [
  "https://i.ibb.co/PzwBLcZX/image.png",
  "https://i.ibb.co/KxwMW1MC/image.png",
  "https://i.ibb.co/bgsnsk6q/image.png",
];

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    //arrows: true,
    fade: true,
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
    pauseOnHover: false,
  };

  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
      <Slider {...settings} className="h-full">
        {images.map((img, index) => (
          <div key={index}>
            <div className="relative w-full h-[75vh] md:h-[85vh] lg:h-[95vh]">
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${img})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Hero Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fadeIn">
          Find Your <span className="text-pink-300">Perfect Match</span>
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto animate-fadeIn delay-100">
          Discover meaningful connections that last a lifetime
        </p>
        <Link to='/dashboard/edit-biodata'>
          <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 animate-fadeIn delay-200">
            Start Your Journey
          </button>
        </Link>
      </div>

      {/* Custom dots position */}
      <style jsx global>{`
        .slick-dots {
          bottom: 30px !important;
        }
        .slick-dots li button:before {
          color: white !important;
          font-size: 10px !important;
        }
        .slick-dots li.slick-active button:before {
          color: #db2777 !important;
        }
        .slick-arrow {
          z-index: 10;
        }
        .slick-prev {
          left: 25px !important;
        }
        .slick-next {
          right: 25px !important;
        }
        .slick-prev:before,
        .slick-next:before {
          font-size: 30px !important;
          opacity: 0.8 !important;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        .delay-100 {
          animation-delay: 100ms;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
      
    </div>
  );
};

export default Banner;
