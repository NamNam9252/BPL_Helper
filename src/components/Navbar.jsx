import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useAuth();
  const [showTools, setShowTools] = useState(false);
  const [isHindi, setIsHindi] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [reading, setReading] = useState(false);
  const [readLang, setReadLang] = useState('en');

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Helpdesk', href: '/helpdesk' },
    { name: 'About', href: '/about' },
    { name: 'Register', href: '/register' },
    { name: 'Schemes', href: '/schemes' },
    { name: 'Ration Card', href: '/ration-card' },
    { name: "People's Stories", href: '/stories' },
    { name: 'Community Chat', href: '/community-chat' },
  ];

  // Open Google Translate for the current site in Hindi
  const handleChromeTranslate = () => {
    const url = window.location.href;
    const translateUrl = `https://translate.google.com/translate?sl=auto&tl=hi&u=${encodeURIComponent(url)}`;
    window.open(translateUrl, '_blank');
  };

  // Simple demo translation (replace body text)
  const handleTranslate = () => {
    setIsHindi((prev) => {
      const next = !prev;
      document.body.classList.toggle('hindi-font', next);
      if (next) {
        document.body.setAttribute('lang', 'hi');
      } else {
        document.body.setAttribute('lang', 'en');
      }
      return next;
    });
  };

  // Simple text size toggle
  const handleTextSize = () => {
    setLargeText((prev) => {
      const next = !prev;
      document.body.classList.toggle('large-text', next);
      return next;
    });
  };

  // Read aloud the page content
  const handleReadAloud = (lang) => {
    setReadLang(lang);
    setReading(true);
    const synth = window.speechSynthesis;
    synth.cancel();
    let text = document.body.innerText;
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
    utter.onend = () => setReading(false);
    synth.speak(utter);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-gray-800 backdrop-blur-md shadow-lg z-50 border-b border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* HELPER at extreme left */}
          <div className="flex-shrink-0 flex items-center mr-8">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-blue-500 hover:to-purple-500 transition-all duration-300 pl-0">
              HELPER
            </Link>
          </div>
          {/* Navigation centered */}
          <div className="flex-1 flex justify-center">
            <div className="hidden sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="relative inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-100 hover:text-white group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                </Link>
              ))}
            </div>
          </div>
          {/* Profile at extreme right */}
          <div className="hidden sm:flex sm:items-center sm:justify-end min-w-[200px] ml-auto">
            {currentUser ? (
              <Link
                to="/register"
                className="flex items-center space-x-3 text-gray-100 hover:text-white focus:outline-none transition-colors duration-300"
              >
                <img
                  src={currentUser.photo}
                  alt={currentUser.name}
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-blue-400 ring-offset-2"
                />
                <span className="font-medium">HELPER FOR {currentUser.name}</span>
              </Link>
            ) : (
              <Link
                to="/register"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:scale-95 shadow-lg"
              >
                Get Help
              </Link>
            )}
            {/* Chrome Translate button */}
            
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden ml-auto">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-400 transition-colors duration-300"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden transition-all duration-300 ease-in-out`}>
        <div className="pt-2 pb-3 space-y-1 bg-gradient-to-r from-gray-900 to-gray-800 backdrop-blur-md">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-100 hover:text-white hover:bg-gray-800 transition-colors duration-300"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-700">
          {currentUser ? (
            <div>
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <img
                    src={currentUser.photo}
                    alt={currentUser.name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-400 ring-offset-2"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-100">
                    HELPER FOR {currentUser.name}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    {currentUser.phone}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-4">
              <Link
                to="/register"
                className="block text-center px-4 py-2 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-md transition-all duration-300 transform hover:scale-105 focus:scale-95 shadow-lg"
              >
                Get Help
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// Add these styles to your global CSS (index.css or App.css):
// .hindi-font { font-family: 'Noto Sans Devanagari', Arial, sans-serif !important; }
// .large-text { font-size: 1.25em !important; } 
