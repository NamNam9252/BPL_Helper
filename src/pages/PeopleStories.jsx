import React, { useState, useEffect } from 'react';
import qrCode from '../assets/image.png';
import bgVideo from '../assets/bg.mp4';

const AnimatedCounter = ({ end, duration = 10000, prefix = '' }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime;
    let animationFrame;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      const percentage = Math.min(progress / duration, 1);
      const easeOut = 1 - Math.pow(1 - percentage, 3); // Cubic ease-out
      
      setCount(Math.floor(end * easeOut));
      
      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);
  
  return <span>{prefix}{count.toLocaleString()}</span>;
};

const RandomIncrement = ({ baseValue, maxIncrement = 5 }) => {
  const [value, setValue] = useState(baseValue);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setValue(prev => prev + Math.floor(Math.random() * maxIncrement));
    }, 3000); // Update every 3 seconds
    
    return () => clearInterval(interval);
  }, [maxIncrement]);
  
  return <AnimatedCounter end={value} duration={1000} />;
};

const PeopleStories = () => {
  const [showDonatePopup, setShowDonatePopup] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add intersection observer to trigger animation when stats section is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Stories of Hope and Resilience
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories of people who have overcome challenges with the support of our community.
          </p>
        </div>

        {/* Video Section */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              <iframe
                src="https://www.youtube.com/embed/kdrtB2saFrY"
                title="People's Stories"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Making a Difference Together
              </h2>
              <p className="text-gray-600">
                Watch how our community support has transformed lives and brought hope to families living below the poverty line.
              </p>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="relative rounded-2xl shadow-xl p-8 mb-12 overflow-hidden">
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={bgVideo} type="video/mp4" />
          </video>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

          {/* Content */}
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Support Our Cause
              </h2>
              <p className="text-gray-200 max-w-2xl mx-auto">
                Your contribution can make a real difference in someone's life. Scan the QR code to donate and help families in need.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">How Your Support Helps</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-blue-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-200">Provides essential food supplies</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-blue-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-200">Supports education for children</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-blue-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-200">Enables medical assistance</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-blue-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-200">Creates employment opportunities</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Every Contribution Matters</h3>
                  <p className="text-gray-200">
                    100% of your donation goes directly to helping families in need. Together, we can make a lasting impact.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl">
                  <img 
                    src={qrCode} 
                    alt="Donation QR Code" 
                    className="w-64 h-64 object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => setShowDonatePopup(true)}
                  />
                </div>
                <p className="text-sm text-gray-200 text-center">
                  Scan with any UPI app to donate
                </p>
                <button 
                  onClick={() => setShowDonatePopup(true)}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:scale-95 shadow-lg"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Donate Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Statistics */}
        <div id="stats-section" className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform transition-all duration-500 hover:scale-105">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {isVisible && <RandomIncrement baseValue={1000} maxIncrement={3} />}+
            </div>
            <div className="text-gray-600">Families Supported</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform transition-all duration-500 hover:scale-105">
            <div className="text-4xl font-bold text-blue-600 mb-2">₹
              {isVisible && <RandomIncrement baseValue={50} maxIncrement={2} />}L+
            </div>
            <div className="text-gray-600">Donations Received</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform transition-all duration-500 hover:scale-105">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {isVisible && <AnimatedCounter end={20} duration={2000} />}+
            </div>
            <div className="text-gray-600">Districts Covered</div>
          </div>
        </div>
      </div>

      {/* Donation QR Code Popup */}
      {showDonatePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowDonatePopup(false)}
          ></div>
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4 transform transition-all">
            <button 
              onClick={() => setShowDonatePopup(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Scan to Donate</h3>
              <div className="bg-gray-100 p-8 rounded-xl shadow-inner mb-4">
                <img 
                  src={qrCode} 
                  alt="Donation QR Code" 
                  className="w-full max-w-md mx-auto"
                />
              </div>
              <p className="text-gray-600">
                Use any UPI app to scan this QR code and make your contribution
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeopleStories; 