import { useState } from 'react';

const SchemeCard = ({ scheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Official website links and helpline numbers for each scheme
  const schemeDetails = {
    "Pradhan Mantri Awas Yojana (PMAY)": {
      website: "https://pmaymis.gov.in/",
      helpline: "1800-11-3377",
      email: "support-pmay@nic.in"
    },
    "Indira Awas Yojana (IAY)": {
      website: "https://pmayg.nic.in/",
      helpline: "1800-11-3377",
      email: "support-pmay@nic.in"
    },
    "Pradhan Mantri Ujjwala Yojana (PMUY)": {
      website: "https://www.pmuy.gov.in/",
      helpline: "1800-266-6696",
      email: "pmuy@petroleum.nic.in"
    },
    "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)": {
      website: "https://pmjay.gov.in/",
      helpline: "14555",
      email: "support@pmjay.gov.in"
    },
    "Pradhan Mantri Swasthya Suraksha Yojana (PMSSY)": {
      website: "https://pmssy-mohfw.nic.in/",
      helpline: "1800-11-6666",
      email: "pmssy-mohfw@nic.in"
    },
    "National Food Security Act (NFSA)": {
      website: "https://nfsa.gov.in/",
      helpline: "1967",
      email: "support@nfsa.gov.in"
    },
    "Antyodaya Anna Yojana (AAY)": {
      website: "https://nfsa.gov.in/",
      helpline: "1967",
      email: "support@nfsa.gov.in"
    },
    "Beti Bachao Beti Padhao": {
      website: "https://wcd.nic.in/schemes/beti-bachao-beti-padhao-scheme",
      helpline: "1800-11-7827",
      email: "bbbp-mwcd@gov.in"
    },
    "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)": {
      website: "https://www.pmkvyofficial.org/",
      helpline: "1800-102-6000",
      email: "support@pmkvyofficial.org"
    },
    "Pradhan Mantri Jan Dhan Yojana (PMJDY)": {
      website: "https://pmjdy.gov.in/",
      helpline: "1800-110-001",
      email: "support@pmjdy.gov.in"
    },
    "Pradhan Mantri Mudra Yojana (PMMY)": {
      website: "https://www.mudra.org.in/",
      helpline: "1800-180-1111",
      email: "support@mudra.org.in"
    }
  };

  const handleApplyNow = () => {
    const details = schemeDetails[scheme.title];
    if (details && details.website) {
      window.open(details.website, '_blank');
    }
  };

  const handleDownloadForm = () => {
    const details = schemeDetails[scheme.title];
    if (details && details.website) {
      window.open(`${details.website}/download-forms`, '_blank');
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{scheme.title}</h3>
          <p className="text-gray-600 mb-4">{scheme.description}</p>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Key Benefits:</h4>
              <ul className="list-disc list-inside space-y-1">
                {scheme.benefits.map((benefit, idx) => (
                  <li key={idx} className="text-gray-600">{benefit}</li>
                ))}
              </ul>
            </div>
          </div>

          <button 
            onClick={() => setIsOpen(true)}
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Popup Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Blurred Background */}
          <div 
            className="absolute inset-0 backdrop-blur-md bg-black/30"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Popup Content */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-white rounded-lg shadow-2xl">
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8 h-full overflow-y-auto">
              {/* Header Section */}
              <div className="border-b pb-6 mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{scheme.title}</h2>
                <p className="text-gray-600 text-lg">{scheme.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">Scheme Details</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold text-blue-800 mb-2">Benefits:</h4>
                      <ul className="list-disc list-inside space-y-2">
                        {scheme.benefits.map((benefit, idx) => (
                          <li key={idx} className="text-blue-700">{benefit}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold text-green-800 mb-2">Eligibility:</h4>
                      <ul className="list-disc list-inside space-y-2">
                        {scheme.eligibility.map((item, idx) => (
                          <li key={idx} className="text-green-700">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">Application Process</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-700 mb-2">Required Documents:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {scheme.documents.map((doc, idx) => (
                          <li key={idx} className="text-gray-600">{doc}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Contact Information:</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <div>
                            <p className="text-sm text-purple-600">Scheme Helpline</p>
                            <p className="font-medium text-purple-800">{schemeDetails[scheme.title]?.helpline || '1800-XXX-XXXX'}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <div>
                            <p className="text-sm text-purple-600">Email Support</p>
                            <p className="font-medium text-purple-800">{schemeDetails[scheme.title]?.email || 'support@scheme.gov.in'}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                          <div>
                            <p className="text-sm text-purple-600">Official Website</p>
                            <a 
                              href={schemeDetails[scheme.title]?.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="font-medium text-purple-800 hover:text-purple-600"
                            >
                              {schemeDetails[scheme.title]?.website || 'www.scheme.gov.in'}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-700 mb-2">Application Steps:</h4>
                      <ol className="list-decimal list-inside space-y-2">
                        <li className="text-gray-600">Visit the official website</li>
                        <li className="text-gray-600">Register with your details</li>
                        <li className="text-gray-600">Upload required documents</li>
                        <li className="text-gray-600">Submit application</li>
                        <li className="text-gray-600">Track application status</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button 
                  onClick={handleApplyNow}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>Apply Now</span>
                </button>
                <button 
                  onClick={handleDownloadForm}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download Form</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SchemeCard; 