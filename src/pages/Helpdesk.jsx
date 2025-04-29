import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Helpdesk = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('chat');
  const [ticketForm, setTicketForm] = useState({
    category: '',
    subject: '',
    description: '',
    priority: 'medium'
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content: "Hello! I'm your AI assistant. I can help you with information about various government schemes. Here are the main schemes available:",
      options: [
        "Pradhan Mantri Ujjwala Yojana (PMUY)",
        "Pradhan Mantri Awas Yojana (PMAY)",
        "Ayushman Bharat - PMJAY",
        "Pradhan Mantri Jan Dhan Yojana",
        "Pradhan Mantri Kaushal Vikas Yojana",
        "Other schemes"
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const navigate = useNavigate();
  const [showMicroLoanForm, setShowMicroLoanForm] = useState(false);
  const [microLoanForm, setMicroLoanForm] = useState({ name: '', phone: '', idNumber: '' });
  const [microLoanSuccess, setMicroLoanSuccess] = useState(false);

  const categories = [
    { id: 'housing', name: 'Housing Schemes', icon: '🏠', schemes: [
      'Pradhan Mantri Awas Yojana (PMAY)',
      'Indira Awas Yojana (IAY)'
    ]},
    { id: 'energy', name: 'Energy Schemes', icon: '⚡', schemes: [
      'Pradhan Mantri Ujjwala Yojana (PMUY)'
    ]},
    { id: 'health', name: 'Health Schemes', icon: '🏥', schemes: [
      'Ayushman Bharat - PMJAY',
      'Pradhan Mantri Swasthya Suraksha Yojana'
    ]},
    { id: 'food', name: 'Food Security', icon: '🍚', schemes: [
      'National Food Security Act (NFSA)',
      'Antyodaya Anna Yojana (AAY)'
    ]},
    { id: 'education', name: 'Education Schemes', icon: '📚', schemes: [
      'Beti Bachao Beti Padhao',
      'Pradhan Mantri Kaushal Vikas Yojana'
    ]},
    { id: 'financial', name: 'Financial Schemes', icon: '💰', schemes: [
      'Pradhan Mantri Jan Dhan Yojana',
      'Pradhan Mantri Mudra Yojana'
    ]}
  ];

  const faqs = [
    {
      question: "How do I check my eligibility for government schemes?",
      answer: "You can check your eligibility by visiting our Schemes page and using the eligibility checker tool. Enter your details and the system will show you all the schemes you might be eligible for."
    },
    {
      question: "What documents are required for ration card application?",
      answer: "The basic documents required are proof of identity (Aadhaar/PAN), proof of address (utility bill/rental agreement), income proof, and family photos. Visit our Ration Card page for a detailed list."
    },
    {
      question: "How long does it take to process my application?",
      answer: "Processing times vary by scheme and location, but typically take 15-30 working days. You can check your application status using your application reference number."
    },
    {
      question: "What should I do if I face technical issues?",
      answer: "If you encounter technical issues, try clearing your browser cache and cookies. If the problem persists, raise a ticket through our helpdesk with screenshots and error details."
    }
  ];

  const getCurrentUser = () => {
    try {
      return JSON.parse(localStorage.getItem('currentUser'));
    } catch {
      return null;
    }
  };

  const handleMicroLoanFormChange = (e) => {
    const { name, value } = e.target;
    setMicroLoanForm(prev => ({ ...prev, [name]: value }));
  };

  const handleMicroLoanFormSubmit = (e) => {
    e.preventDefault();
    setShowMicroLoanForm(false);
    setMicroLoanSuccess(true);
    setTimeout(() => setMicroLoanSuccess(false), 4000);
  };

  const predefinedResponses = {
    "pradhan mantri ujjwala yojana": {
      response: "Pradhan Mantri Ujjwala Yojana (PMUY) provides free LPG connections to women from Below Poverty Line (BPL) households. How can I help you with PMUY?",
      options: [
        "How to avail subsidy",
        "Get subsidized gas cylinders",
        "Book a community drive",
        "Connect with your community",
        "Apply for micro loans",
        "More ideas for PMUY"
      ]
    },
    "more ideas for pmuy": {
      response: "Here are some innovative ideas and community initiatives related to PMUY:",
      options: [
        "Know about community bio plant",
        "Young youth as the gas delivery boys",
        "Community gas banks",
        "Create a community kitchen",
        "Fire safety awareness",
        "Barter-friendly models",
        "Back to PMUY options"
      ]
    },
    "know about community bio plant": {
      response: "Community biogas plants are small, locally managed facilities that convert livestock waste into clean cooking fuel. These plants help reduce dependence on LPG, lower fuel costs, and promote sustainable waste management. Setting up a biogas plant in your community can provide a reliable and eco-friendly energy source for multiple families.",
      options: ["Back to More ideas for PMUY"]
    },
    "young youth as the gas delivery boys": {
      response: "Engage local youth as gas delivery agents. This not only creates employment opportunities for young people but also ensures timely and reliable LPG delivery in remote areas. Training and empowering youth for this role can strengthen the supply chain and foster community involvement.",
      options: ["Back to More ideas for PMUY"]
    },
    "community gas banks": {
      response: "Mini gas banks, or 'LPG Banks', are small storage hubs set up in central tribal or rural locations. Families can collect cylinders on demand, reducing travel time and ensuring consistent access to LPG. This model is especially useful in areas with limited delivery infrastructure.",
      options: ["Back to More ideas for PMUY"]
    },
    "create a community kitchen": {
      response: "Shared cooking spaces or community kitchens can be developed near worker colonies or villages. These kitchens offer safe, affordable cooking setups for families who may not have access to their own LPG connection. Community kitchens also promote social interaction and efficient resource use.",
      options: ["Back to More ideas for PMUY"]
    },
    "fire safety awareness": {
      response: "Fire safety awareness programs educate families about safe LPG usage, emergency procedures, and preventive measures. Organizing regular workshops and demonstrations can greatly reduce the risk of accidents and build a culture of safety in the community.",
      options: ["Back to More ideas for PMUY"]
    },
    "barter-friendly models": {
      response: "Barter-friendly models involve partnering with local co-operatives to allow partial payments for LPG in the form of forest produce or handmade goods, such as honey or bamboo crafts. This approach makes clean cooking fuel more accessible to families with limited cash income and supports local livelihoods.",
      options: ["Back to More ideas for PMUY"]
    },
    "connect with your community": {
      response: "You can connect with your local community through our Community Chat feature. This allows you to discuss PMUY benefits, share experiences, and get local support.",
      options: [
        "Join community chat",
        "Back to PMUY options"
      ]
    },
    "join community chat": {
      response: "I'll redirect you to the community chat page. Please enter your pincode to connect with your local community members.",
      options: null,
      action: () => {
        navigate('/community-chat');
        return true; // Indicate that navigation was handled
      }
    },
    "how to avail subsidy": {
      response: "Here are the details about PMUY subsidy:\n\n" +
        "1. Benefits:\n" +
        "   - Free LPG connection with first refill\n" +
        "   - Financial support for first refill\n" +
        "   - Health benefits from clean cooking fuel\n" +
        "   - Empowerment of women through clean energy\n" +
        "   - Reduced indoor air pollution\n\n" +
        "2. Eligibility:\n" +
        "   - Women from BPL households\n" +
        "   - SC/ST households\n" +
        "   - Most Backward Classes (MBC)\n" +
        "   - Forest dwellers\n" +
        "   - Residents of islands and river islands\n\n" +
        "3. Required Documents:\n" +
        "   - Aadhaar Card\n" +
        "   - BPL Certificate\n" +
        "   - Bank Account Details\n" +
        "   - Address Proof\n" +
        "   - Passport size photograph\n\n" +
        "4. Application Process:\n" +
        "   - Visit the nearest LPG distributor\n" +
        "   - Fill the application form\n" +
        "   - Submit required documents\n" +
        "   - Receive LPG connection and first refill\n\n" +
        "For more information, visit: https://www.pmuy.gov.in/\n" +
        "Helpline: 1800-266-6696",
      options: [
        "Back to PMUY options",
        "View other schemes"
      ]
    },
    "book a community drive": {
      response: "Our Community Drive program helps educate people about LPG safety and government schemes. Here's what you need to know:\n\n" +
        "1. What is a Community Drive?\n" +
        "   - Educational sessions about LPG safety\n" +
        "   - Information about government schemes\n" +
        "   - On-site assistance with applications\n" +
        "   - Free safety demonstrations\n\n" +
        "2. Benefits:\n" +
        "   - Learn about safe LPG usage\n" +
        "   - Get help with applications\n" +
        "   - Understand subsidy benefits\n" +
        "   - Connect with experts\n\n" +
        "3. Requirements:\n" +
        "   - Minimum 10 participants\n" +
        "   - Suitable venue for the session\n" +
        "   - Basic seating arrangements\n\n" +
        "Would you like to book a community drive for your area?",
      options: [
        "Yes, book a drive",
        "More information",
        "Back to PMUY options"
      ]
    },
    "yes, book a drive": {
      response: "Great! I'll redirect you to the community drive booking form. Please fill in the details about your community and preferred date/time for the drive.",
      options: null,
      action: () => navigate('/community-drive')
    },
    "more information": {
      response: "Here's more detailed information about our Community Drives:\n\n" +
        "1. Session Duration: 2-3 hours\n" +
        "2. Topics Covered:\n" +
        "   - LPG safety guidelines\n" +
        "   - Government subsidy schemes\n" +
        "   - Application process\n" +
        "   - Safety demonstrations\n" +
        "   - Q&A session\n\n" +
        "3. Our Team Provides:\n" +
        "   - Expert speakers\n" +
        "   - Educational materials\n" +
        "   - Safety equipment\n" +
        "   - Application forms\n\n" +
        "4. Best Practices:\n" +
        "   - Choose a well-ventilated area\n" +
        "   - Ensure good attendance\n" +
        "   - Prepare questions in advance\n" +
        "   - Have necessary documents ready\n\n" +
        "Would you like to proceed with booking a drive?",
      options: [
        "Yes, book a drive",
        "Back to PMUY options"
      ]
    },
    "pradhan mantri awas yojana": {
      response: "Our assistance for Pradhan Mantri Awas Yojana (PMAY) is coming soon. Please check back later for detailed information about housing schemes.",
      options: null
    },
    "ayushman bharat": {
      response: "Our assistance for Ayushman Bharat - PMJAY is coming soon. Please check back later for detailed information about health insurance schemes.",
      options: null
    },
    "pradhan mantri jan dhan yojana": {
      response: "Our assistance for Pradhan Mantri Jan Dhan Yojana is coming soon. Please check back later for detailed information about financial inclusion schemes.",
      options: null
    },
    "pradhan mantri kaushal vikas yojana": {
      response: "Our assistance for Pradhan Mantri Kaushal Vikas Yojana is coming soon. Please check back later for detailed information about skill development schemes.",
      options: null
    },
    "other schemes": {
      response: "Our assistance for other schemes is coming soon. Please check back later for detailed information about various government schemes.",
      options: null
    },
    "apply for micro loans": {
      response: null,
      options: null,
      action: () => {
        const user = getCurrentUser();
        if (!user) {
          navigate('/register');
          return true;
        } else {
          setMicroLoanForm({ name: user.name || '', phone: user.phone || '', idNumber: '' });
          setShowMicroLoanForm(true);
          return true;
        }
      }
    }
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = async (message, options = null) => {
    setIsTyping(true);
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000));
    setMessages(prev => [...prev, { type: 'assistant', content: message, options }]);
    setIsTyping(false);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: inputMessage }]);
    const userQuery = inputMessage.toLowerCase();
    setInputMessage('');

    // Find matching predefined response
    const matchingResponse = Object.entries(predefinedResponses).find(([key]) => 
      userQuery.includes(key)
    );

    if (matchingResponse) {
      const [_, response] = matchingResponse;
      await simulateTyping(response.response, response.options);
    } else {
      await simulateTyping(
        "I'm not sure I understand. Could you please choose one of these topics?",
        Object.keys(predefinedResponses).map(key => key.charAt(0).toUpperCase() + key.slice(1))
      );
    }
  };

  const pmuySubsidyDetails = {
    title: "Pradhan Mantri Ujjwala Yojana (PMUY)",
    description: "Free LPG connections to women from BPL households",
    benefits: [
      "Free LPG connection with first refill",
      "Financial support for first refill",
      "Health benefits from clean cooking fuel",
      "Empowerment of women through clean energy",
      "Reduced indoor air pollution"
    ],
    eligibility: [
      "Women from BPL households",
      "SC/ST households",
      "Most Backward Classes (MBC)",
      "Forest dwellers",
      "Residents of islands and river islands"
    ],
    documents: [
      "Aadhaar Card",
      "BPL Certificate",
      "Bank Account Details",
      "Address Proof",
      "Passport size photograph"
    ],
    contact: {
      website: "https://www.pmuy.gov.in/",
      helpline: "1800-266-6696",
      email: "pmuy@petroleum.nic.in"
    }
  };

  const handleOptionClick = async (option) => {
    // Add user selection to chat
    setMessages(prev => [...prev, { type: 'user', content: option }]);

    if (option === "How to avail subsidy") {
      setPopupContent(pmuySubsidyDetails);
      setShowPopup(true);
      await simulateTyping(
        "Here are the details about PMUY subsidy. Please review the information in the popup.",
        ["Back to PMUY options", "View other schemes"]
      );
    } else if (option === "Get subsidized gas cylinders") {
      navigate('/subsidized-products');
      return;
    } else if (option === "Connect with your community") {
      const response = predefinedResponses["connect with your community"];
      await simulateTyping(response.response, response.options);
    } else if (option === "Join community chat") {
      const response = predefinedResponses["join community chat"];
      await simulateTyping(response.response, response.options);
      if (response.action) {
        response.action();
      }
    } else if (option === "Back to PMUY options") {
      const pmuyResponse = predefinedResponses["pradhan mantri ujjwala yojana"];
      await simulateTyping(pmuyResponse.response, pmuyResponse.options);
    } else if (option === "Apply for micro loans") {
      const response = predefinedResponses["apply for micro loans"];
      if (response.action) response.action();
      return;
    } else if (option === "More ideas for PMUY") {
      const response = predefinedResponses["more ideas for pmuy"];
      await simulateTyping(response.response, response.options);
      return;
    } else if ([
      "Know about community bio plant",
      "Young youth as the gas delivery boys",
      "Community gas banks",
      "Create a community kitchen",
      "Fire safety awareness",
      "Barter-friendly models"
    ].includes(option)) {
      const response = predefinedResponses[option.toLowerCase()];
      await simulateTyping(response.response, response.options);
      return;
    } else if (option === "Back to More ideas for PMUY") {
      const response = predefinedResponses["more ideas for pmuy"];
      await simulateTyping(response.response, response.options);
      return;
    } else {
      // Find matching predefined response
      const matchingResponse = Object.entries(predefinedResponses).find(([key]) => 
        option.toLowerCase().includes(key)
      );

      if (matchingResponse) {
        const [_, response] = matchingResponse;
        await simulateTyping(response.response, response.options);
        if (response.action) {
          response.action();
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the ticket to your backend
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setTicketForm({
        category: '',
        subject: '',
        description: '',
        priority: 'medium'
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-12 ${showPopup ? 'blur-sm' : ''}`}>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How can we help you today?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get support for all your queries related to government schemes, applications, and benefits
          </p>
        </div>

        {/* Main Content */}
        <div className={`bg-white rounded-2xl shadow-xl overflow-hidden ${showPopup ? 'blur-sm' : ''}`}>
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'chat'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Chat Support
            </button>
            <button
              onClick={() => setActiveTab('schemes')}
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'schemes'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Browse Schemes
            </button>
            <button
              onClick={() => setActiveTab('ticket')}
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'ticket'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Submit Ticket
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'chat' ? (
              <div className="max-w-3xl mx-auto">
                {/* Chat Container */}
                <div className="bg-gray-50 rounded-lg p-4 h-[500px] flex flex-col">
                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                    {messages.map((message, index) => (
                      <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] ${
                          message.type === 'user' 
                            ? 'bg-blue-600 text-white rounded-l-lg rounded-br-lg' 
                            : 'bg-white text-gray-800 rounded-r-lg rounded-bl-lg shadow-md'
                          } p-4`}
                        >
                          <p className="text-sm">{message.content}</p>
                          {message.options && (
                            <div className="mt-3 space-y-2">
                              {message.options.map((option, optIndex) => (
                                <button
                                  key={optIndex}
                                  onClick={() => handleOptionClick(option)}
                                  className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
                                    message.type === 'user'
                                      ? 'bg-blue-700 hover:bg-blue-800 text-white'
                                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                                  } transition-colors duration-150`}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-white text-gray-800 rounded-r-lg rounded-bl-lg shadow-md p-4">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                  
                  {/* Input Area */}
                  <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>
            ) : activeTab === 'schemes' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 p-6"
                  >
                    <div className="flex flex-col items-center text-center">
                      <span className="text-4xl mb-3">{category.icon}</span>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">{category.name}</h3>
                      <ul className="space-y-2 text-gray-600">
                        {category.schemes.map((scheme, idx) => (
                          <li key={idx} className="text-sm">{scheme}</li>
                        ))}
                      </ul>
                      <Link
                        to="/schemes"
                        className="mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {showSuccess && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-green-700">
                            Ticket submitted successfully! We'll get back to you soon.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                      value={ticketForm.category}
                      onChange={(e) => setTicketForm(prev => ({ ...prev, category: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select a category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subject</label>
                    <input
                      type="text"
                      value={ticketForm.subject}
                      onChange={(e) => setTicketForm(prev => ({ ...prev, subject: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Brief description of your issue"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={ticketForm.description}
                      onChange={(e) => setTicketForm(prev => ({ ...prev, description: e.target.value }))}
                      rows="4"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Provide detailed information about your issue"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <select
                      value={ticketForm.priority}
                      onChange={(e) => setTicketForm(prev => ({ ...prev, priority: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg transform transition-all duration-300 hover:scale-105"
                    >
                      Submit Ticket
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className={`mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${showPopup ? 'blur-sm' : ''}`}>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <svg className="h-6 w-6 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900">Phone Support</h3>
            </div>
            <p className="text-gray-600">Available Mon-Fri, 9AM-6PM</p>
            <p className="text-blue-600 font-medium mt-2">1800-123-4567</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <svg className="h-6 w-6 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900">Email Support</h3>
            </div>
            <p className="text-gray-600">We'll respond within 24 hours</p>
            <p className="text-blue-600 font-medium mt-2">support@helper.com</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <svg className="h-6 w-6 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900">Live Chat</h3>
            </div>
            <p className="text-gray-600">Chat with our support team</p>
            <button className="text-blue-600 font-medium mt-2 hover:text-blue-700">Start Chat</button>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
            <div className="p-8">
              {/* Header Section */}
              <div className="border-b pb-6 mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{popupContent.title}</h2>
                <p className="text-gray-600 text-lg">{popupContent.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">Scheme Details</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold text-blue-800 mb-2">Benefits:</h4>
                      <ul className="list-disc list-inside space-y-2">
                        {popupContent.benefits.map((benefit, idx) => (
                          <li key={idx} className="text-blue-700">{benefit}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold text-green-800 mb-2">Eligibility:</h4>
                      <ul className="list-disc list-inside space-y-2">
                        {popupContent.eligibility.map((item, idx) => (
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
                        {popupContent.documents.map((doc, idx) => (
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
                            <p className="font-medium text-purple-800">{popupContent.contact.helpline}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <div>
                            <p className="text-sm text-purple-600">Email Support</p>
                            <p className="font-medium text-purple-800">{popupContent.contact.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                          <div>
                            <p className="text-sm text-purple-600">Official Website</p>
                            <a 
                              href={popupContent.contact.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="font-medium text-purple-800 hover:text-purple-600"
                            >
                              {popupContent.contact.website}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button 
                  onClick={() => {
                    setShowPopup(false);
                    setPopupContent(null);
                  }}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Micro Loan Modal */}
      {showMicroLoanForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-white/30">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Micro Loan Application</h2>
            <form onSubmit={handleMicroLoanFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="name" value={microLoanForm.name} onChange={handleMicroLoanFormChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input type="text" name="phone" value={microLoanForm.phone} onChange={handleMicroLoanFormChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">ID Number</label>
                <input type="text" name="idNumber" value={microLoanForm.idNumber} onChange={handleMicroLoanFormChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setShowMicroLoanForm(false)} className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Micro Loan Success Alert */}
      {microLoanSuccess && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce-in">
          Our team will contact you to provide micro loans.
        </div>
      )}
    </div>
  );
};

export default Helpdesk; 