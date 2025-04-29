import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Background3D from '../components/Background3D';
import BPLStats from '../components/BPLStats';

const Home = () => {
  const [formData, setFormData] = useState({
    income: '',
    occupation: 'student',
    assets: 'no',
    rationCard: 'yes'
  });
  const [result, setResult] = useState(null);
  const [isVisible, setIsVisible] = useState({
    header: false,
    stats: false,
    motive: false,
    form: false
  });

  useEffect(() => {
    // Trigger animations on mount
    setIsVisible({
      header: true,
      stats: true,
      motive: true,
      form: true
    });
  }, []);

  const checkEligibility = (e) => {
    e.preventDefault();
    const { income, occupation, assets, rationCard } = formData;
    
    // Basic eligibility check
    const isEligible = 
      parseFloat(income) < 150000 && // Annual income less than 1.5 lakhs
      assets === 'no' && 
      rationCard === 'yes';

    setResult({
      isEligible,
      message: isEligible 
        ? 'You are eligible for BPL benefits. Please check available schemes.'
        : rationCard === 'no'
          ? 'You are not eligible for BPL benefits as you do not have a ration card. Please get a ration card first.'
          : 'Based on the provided information, you may not be eligible for BPL benefits.',
      needsRationCard: rationCard === 'no'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="relative min-h-screen">
      <Background3D />
      
      <div className="relative z-10 min-h-screen">
        {/* Header Section */}
        <header className={`py-16 transition-all duration-1000 transform ${isVisible.header ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'}`}>
          <div className="container px-5">
            <div className="max-w-5xl mx-auto">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-white mb-6 drop-shadow-lg bg-clip-text">
                  <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text">
                    Connecting BPL Families to
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                    Government Welfare
                  </span>
                </h1>
                <p className="text-2xl text-white max-w-3xl mx-auto drop-shadow-lg mb-8 leading-relaxed">
                  Stay informed, stay empowered — access your rights and improve your quality of life.
                </p>
                <div className="flex justify-center space-x-6">
                  <a 
                    href="#statistics-section" 
                    className="group relative inline-flex items-center px-8 py-3 overflow-hidden rounded-full bg-blue-600 text-white transition-all duration-300 hover:bg-blue-700"
                  >
                    <span className="absolute left-0 w-0 h-full bg-white opacity-10 transition-all duration-300 group-hover:w-full"></span>
                    <span className="relative flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      View Statistics
                    </span>
                  </a>
                  <a 
                    href="#form-section" 
                    className="group relative inline-flex items-center px-8 py-3 overflow-hidden rounded-full bg-purple-600 text-white transition-all duration-300 hover:bg-purple-700"
                  >
                    <span className="absolute left-0 w-0 h-full bg-white opacity-10 transition-all duration-300 group-hover:w-full"></span>
                    <span className="relative flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Check Eligibility
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Statistics Section */}
        <section id="statistics-section" className={`py-16 transition-all duration-1000 transform ${isVisible.stats ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="container px-5">
            <BPLStats />
          </div>
        </section>

        {/* Motive Section */}
        <section className={`py-16 transition-all duration-1000 transform ${isVisible.motive ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="container px-5">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-12 max-w-4xl mx-auto border border-blue-100">
              <div className="text-center space-y-6">
                <div className="inline-block p-3 bg-blue-50 rounded-full mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Our Motive</h2>
                <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                  We aim to help citizens quickly check if they are eligible under the BPL (Below Poverty Line) criteria in India. 
                  This system ensures transparency, ease, and awareness for those seeking government support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility Form Section */}
        <section id="form-section" className={`py-16 transition-all duration-1000 transform ${isVisible.form ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="container px-5">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-purple-100">
                <div className="text-center mb-8">
                  <div className="inline-block p-3 bg-purple-50 rounded-full mb-4">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Check Your Eligibility
                  </h2>
                </div>
                
                <form onSubmit={checkEligibility} className="space-y-6">
                  <div className="group">
                    <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-1">
                      Annual Income (in ₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        id="income"
                        name="income"
                        value={formData.income}
                        onChange={handleInputChange}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                        placeholder="Enter your annual income"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
                      Occupation
                    </label>
                    <select
                      id="occupation"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                      required
                    >
                      <option value="student">Student</option>
                      <option value="employed">Employed</option>
                      <option value="unemployed">Unemployed</option>
                      <option value="irregular">Irregular Income</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="assets" className="block text-sm font-medium text-gray-700 mb-1">
                      Own any major assets? (e.g., car, house)
                    </label>
                    <select
                      id="assets"
                      name="assets"
                      value={formData.assets}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                      required
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="rationCard" className="block text-sm font-medium text-gray-700 mb-1">
                      Do you have a Ration Card?
                    </label>
                    <select
                      id="rationCard"
                      name="rationCard"
                      value={formData.rationCard}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                      required
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-[1.02] focus:scale-[0.98] font-semibold text-lg shadow-lg"
                  >
                    Check Eligibility
                  </button>
                </form>

                {result && (
                  <div className={`mt-8 p-6 rounded-lg border ${
                    result.isEligible 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-yellow-50 border-yellow-200'
                  } transform transition-all duration-500 animate-fade-in-up`}>
                    <p className="text-lg text-gray-800 mb-4">{result.message}</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                      {result.isEligible && (
                        <Link
                          to="/schemes"
                          className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-[1.02] focus:scale-[0.98] shadow-lg"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          View Available Schemes
                        </Link>
                      )}
                      {result.needsRationCard && (
                        <Link
                          to="/ration-card"
                          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-[1.02] focus:scale-[0.98] shadow-lg"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                          </svg>
                          Get Ration Card
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home; 