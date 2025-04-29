import { Link } from 'react-router-dom';

const RationCard = () => {
  const videos = [
    {
      title: "How to Apply for Ration Card Online",
      url: "https://www.youtube.com/embed/on2irxh3r7M",
      description: "Step by step guide to apply for ration card online"
    },
    {
      title: "Documents Required for Ration Card",
      url: "https://www.youtube.com/embed/zLU1neC2KWA",
      description: "List of all required documents for ration card application"
    },
    {
      title: "Ration Card Application Process",
      url: "https://www.youtube.com/embed/kjgv9Andiec",
      description: "Complete process of ration card application"
    }
  ];

  const stateLinks = [
    {
      state: "Delhi",
      website: "https://edistrict.delhigovt.nic.in/",
      helpline: "1800-11-7200"
    },
    {
      state: "Maharashtra",
      website: "https://rcms.mahafood.gov.in/",
      helpline: "1800-22-7777"
    },
    {
      state: "Karnataka",
      website: "https://ahara.kar.nic.in/",
      helpline: "1800-425-5901"
    },
    {
      state: "Tamil Nadu",
      website: "https://www.tnpds.gov.in/",
      helpline: "1800-425-5901"
    },
    {
      state: "Gujarat",
      website: "https://ipds.gujarat.gov.in/",
      helpline: "1800-233-5500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Get Your Ration Card</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn how to apply for a ration card and access government food security benefits
          </p>
        </div>

        {/* Helpline Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-gray-100">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">National Food Security Helpline</h2>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12">
            <div className="text-center bg-blue-50 p-6 rounded-lg w-full md:w-auto">
              <p className="text-blue-600 font-medium mb-2">Toll Free Number</p>
              <p className="text-3xl font-bold text-blue-800">1967</p>
            </div>
            <div className="text-center bg-blue-50 p-6 rounded-lg w-full md:w-auto">
              <p className="text-blue-600 font-medium mb-2">Email Support</p>
              <p className="text-xl font-bold text-blue-800">support@nfsa.gov.in</p>
            </div>
          </div>
        </div>

        {/* Video Tutorials */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Video Tutorials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-transform hover:scale-105">
                <div className="relative pb-[56.25%] h-0">
                  <iframe
                    src={video.url}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-800 text-lg mb-3">{video.title}</h3>
                  <p className="text-gray-600">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* State-wise Links */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">State-wise Ration Card Portals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stateLinks.map((state, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{state.state}</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <a 
                      href={state.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Official Website
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-green-600">{state.helpline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <Link
            to="/schemes"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            View Government Schemes
          </Link>
          <Link
            to="/"
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RationCard; 