import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image11 from '../assets/11.png';
import image22 from '../assets/22.png';
import image33 from '../assets/33.png';
import image44 from '../assets/44.png';
import image55 from '../assets/55.png';
import image66 from '../assets/66.png';

const SubsidizedProducts = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    rationCardNumber: '',
    address: '',
    phoneNumber: '',
    cylinderType: '14.2kg',
    numberOfCylinders: 1,
  });

  const products = [
    {
      id: 1,
      name: "14.2 kg LPG Cylinder",
      price: 899,
      originalPrice: 1200,
      image: image11,
      description: "Standard 14.2 kg LPG cylinder with safety features and government subsidy",
      features: ["ISI Mark Certified", "Safety Valve", "Government Subsidized", "Free Delivery"],
      rating: 4.5,
      reviews: 128
    },
    {
      id: 2,
      name: "8.6 kg LPG Cylinder",
      price: 399,
      originalPrice: 600,
      image: image22,
      description: "Compact 5 kg LPG cylinder perfect for small families and students",
      features: ["ISI Mark Certified", "Safety Valve", "Government Subsidized", "Free Delivery"],
      rating: 4.2,
      reviews: 95
    },
    {
      id: 3,
      name: "19 kg LPG Cylinder",
      price: 1299,
      originalPrice: 1600,
      image: image33,
      description: "Large 19 kg LPG cylinder for commercial use and large families",
      features: ["ISI Mark Certified", "Safety Valve", "Government Subsidized", "Free Delivery"],
      rating: 4.7,
      reviews: 64
    },
    {
      id: 4,
      name: "Double Burner Smokeless Stove",
      price: 1499,
      originalPrice: 1999,
      image: image44,
      description: "Premium double burner smokeless stove with advanced safety features",
      features: ["ISI Mark Certified", "Auto-Ignition", "Energy Efficient", "Child Lock", "Spill-Proof Design"],
      rating: 4.8,
      reviews: 215
    },
    {
      id: 5,
      name: "Single Burner Smokeless Stove",
      price: 999,
      originalPrice: 1499,
      image: image55,
      description: "Compact single burner smokeless stove perfect for small kitchens",
      features: ["ISI Mark Certified", "Auto-Ignition", "Energy Efficient", "Child Lock", "Spill-Proof Design"],
      rating: 4.6,
      reviews: 178
    },
    {
      id: 6,
      name: "LPG Accessories Kit",
      price: 299,
      originalPrice: 499,
      image: image66,
      description: "Complete set of LPG accessories for safe and efficient usage",
      features: ["Pressure Regulator", "Hose Pipe", "Clips & Clamps", "Safety Manual", "Installation Guide"],
      rating: 4.4,
      reviews: 92
    }
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Application submitted successfully! We will contact you shortly.');
    navigate('/');
  };

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setFormData(prev => ({
      ...prev,
      cylinderType: product.name.split(' ')[0] // Extract size from product name
    }));
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Subsidized LPG Cylinders & Accessories</h1>
          <button
            onClick={() => navigate('/community-drive')}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Book a Community Drive
          </button>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-64 flex items-center justify-center bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="max-h-full max-w-full object-contain p-4"
                />
                <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm">
                  {product.rating} ★
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <div className="mb-4">
                  <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                  <span className="ml-2 text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                  <span className="ml-2 text-sm text-green-600">Save ₹{product.originalPrice - product.price}</span>
                </div>

                <ul className="mb-4 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <svg className="h-4 w-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{product.reviews} reviews</span>
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Application Form */}
        {showForm && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Apply for {selectedProduct.name}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="rationCardNumber" className="block text-sm font-medium text-gray-700">
                    Ration Card Number
                  </label>
                  <input
                    type="text"
                    name="rationCardNumber"
                    id="rationCardNumber"
                    required
                    value={formData.rationCardNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <textarea
                    name="address"
                    id="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    required
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="numberOfCylinders" className="block text-sm font-medium text-gray-700">
                    Number of Cylinders
                  </label>
                  <input
                    type="number"
                    name="numberOfCylinders"
                    id="numberOfCylinders"
                    min="1"
                    max="3"
                    required
                    value={formData.numberOfCylinders}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubsidizedProducts; 