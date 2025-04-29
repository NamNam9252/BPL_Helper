import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { currentUser, login, logout } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    countryCode: '+91',
    aadharNumber: '',
    pinCode: '',
    area: '',
    photo: null,
    annualIncome: '',
    familyMembers: '',
    rationCardNumber: '',
    occupation: 'unemployed'
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [error, setError] = useState('');

  const countryCodes = [
    { code: '+91', country: 'India' },
    { code: '+1', country: 'USA' },
    { code: '+44', country: 'UK' },
    { code: '+81', country: 'Japan' },
    { code: '+86', country: 'China' }
  ];

  const occupationTypes = [
    { value: 'unemployed', label: 'Unemployed' },
    { value: 'daily-wage', label: 'Daily Wage Worker' },
    { value: 'farmer', label: 'Farmer' },
    { value: 'labor', label: 'Labor' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Photo size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setFormData(prev => ({
          ...prev,
          photo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.phone.trim()) return 'Phone number is required';
    if (!formData.aadharNumber.trim()) return 'Aadhar number is required';
    if (!formData.pinCode.trim()) return 'PIN code is required';
    if (!formData.area.trim()) return 'Area is required';
    if (!formData.photo) return 'Photo is required';
    if (!formData.annualIncome) return 'Annual income is required';
    if (!formData.familyMembers) return 'Number of family members is required';
    if (!formData.rationCardNumber.trim()) return 'Ration card number is required';
    
    // Phone number validation (10 digits)
    if (!/^\d{10}$/.test(formData.phone)) return 'Invalid phone number';
    
    // Aadhar number validation (12 digits, can include dashes)
    if (!/^\d{4}-?\d{4}-?\d{4}$/.test(formData.aadharNumber.replace(/-/g, ''))) {
      return 'Invalid Aadhar number';
    }
    
    // PIN code validation (6 digits)
    if (!/^\d{6}$/.test(formData.pinCode)) return 'Invalid PIN code';

    // Annual income validation (should be less than 1.5 lakhs for BPL)
    if (parseFloat(formData.annualIncome) > 150000) {
      return 'Annual income should be less than 1.5 lakhs for BPL registration';
    }
    
    return '';
  };

  // If user is already logged in, show their profile instead of the form
  if (currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="mb-6">
                <img
                  src={currentUser.photo}
                  alt={currentUser.name}
                  className="h-32 w-32 rounded-full mx-auto object-cover border-4 border-blue-500"
                />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Welcome, {currentUser.name}!</h2>
              <p className="mt-2 text-sm text-gray-600">
                You are registered for assistance
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your Details</h3>
                <dl className="grid grid-cols-1 gap-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                    <dd className="text-sm text-gray-900">{currentUser.countryCode} {currentUser.phone}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Area</dt>
                    <dd className="text-sm text-gray-900">{currentUser.area}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">PIN Code</dt>
                    <dd className="text-sm text-gray-900">{currentUser.pinCode}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Annual Income</dt>
                    <dd className="text-sm text-gray-900">₹{currentUser.annualIncome}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Family Members</dt>
                    <dd className="text-sm text-gray-900">{currentUser.familyMembers}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Occupation</dt>
                    <dd className="text-sm text-gray-900">{currentUser.occupation}</dd>
                  </div>
                </dl>
              </div>

              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    // Generate unique ID
    const userId = Date.now().toString();
    
    // Create user object
    const user = {
      id: userId,
      ...formData,
      verified: true,
      registeredAt: new Date().toISOString()
    };

    // Login the user using auth context
    login(user);

    // Redirect to home page
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Get Help</h2>
            <p className="mt-2 text-sm text-gray-600">
              Register below to receive assistance and support
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* Phone */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700">
                  Country Code
                </label>
                <select
                  id="countryCode"
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {countryCodes.map(({ code, country }) => (
                    <option key={code} value={code}>
                      {code} ({country})
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Annual Income and Family Members */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700">
                  Annual Income (in ₹)
                </label>
                <div className="relative mt-1">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">₹</span>
                  <input
                    type="number"
                    id="annualIncome"
                    name="annualIncome"
                    value={formData.annualIncome}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border border-gray-300 pl-7 pr-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="familyMembers" className="block text-sm font-medium text-gray-700">
                  Number of Family Members
                </label>
                <input
                  type="number"
                  id="familyMembers"
                  name="familyMembers"
                  value={formData.familyMembers}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Occupation */}
            <div>
              <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">
                Occupation
              </label>
              <select
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              >
                {occupationTypes.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Aadhar Number */}
            <div>
              <label htmlFor="aadharNumber" className="block text-sm font-medium text-gray-700">
                Aadhar Number
              </label>
              <input
                type="text"
                id="aadharNumber"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleInputChange}
                placeholder="XXXX-XXXX-XXXX"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* Ration Card Number */}
            <div>
              <label htmlFor="rationCardNumber" className="block text-sm font-medium text-gray-700">
                Ration Card Number
              </label>
              <input
                type="text"
                id="rationCardNumber"
                name="rationCardNumber"
                value={formData.rationCardNumber}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* Area and PIN Code */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                  Area
                </label>
                <input
                  type="text"
                  id="area"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700">
                  PIN Code
                </label>
                <input
                  type="text"
                  id="pinCode"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Photo
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="h-24 w-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="photo"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                    </svg>
                    Upload Photo
                  </label>
                  <p className="mt-2 text-xs text-gray-500">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Register for Help
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register; 