import { useState, useEffect } from 'react';
import image1 from '../assets/1.png';
import image2 from '../assets/2.png';
import image3 from '../assets/3.png';
import image4 from '../assets/4.png';
import image5 from '../assets/5.png';
import image6 from '../assets/6.png';

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      url: image1,
      title: 'Welcome to Helper',
      description: 'Your trusted partner in success'
    },
    {
      url: image2,
      title: 'Professional Support',
      description: 'Expert solutions for your needs'
    },
    {
      url: image3,
      title: 'Expert Assistance',
      description: '24/7 dedicated support team'
    },
    {
      url: image4,
      title: '24/7 Service',
      description: 'Always here when you need us'
    },
    {
      url: image5,
      title: 'Quality Care',
      description: 'Excellence in every interaction'
    },
    {
      url: image6,
      title: 'Your Trusted Partner',
      description: 'Building success together'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-screen h-[500px] overflow-hidden bg-gradient-to-br from-[#FF9933] via-white to-[#138808]">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-all duration-1000 transform ${
            index === currentSlide 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-full'
          }`}
        >
          <div className="w-full h-full flex items-center justify-center p-8">
            <div className="relative w-full h-full max-w-6xl mx-auto">
              <img
                src={slide.url}
                alt={slide.title}
                className="w-full h-full object-contain rounded-lg shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 rounded-b-lg">
                <h2 className="text-4xl font-bold text-white mb-2">{slide.title}</h2>
                <p className="text-xl text-gray-200">{slide.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-gray-400 hover:bg-gray-300'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      {/* Previous/Next Buttons */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300"
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300"
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default ImageSlider; 