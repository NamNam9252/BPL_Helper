import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const CommunityChats = () => {
  // Use localStorage for user info
  const localUser = JSON.parse(localStorage.getItem('currentUser'));
  const currentUser = localUser || null;

  const [pincode, setPincode] = useState('');
  const [confirmPincode, setConfirmPincode] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showChat, setShowChat] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePincodeChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 6) {
      setPincode(value);
      setError('');
    }
  };

  const handleConfirmPincodeChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 6) {
      setConfirmPincode(value);
      setError('');
    }
  };

  const handlePincodeSubmit = (e) => {
    e.preventDefault();
    
    if (pincode.length !== 6) {
      setError('Please enter a valid 6-digit pincode');
      return;
    }

    if (confirmPincode.length !== 6) {
      setError('Please confirm your 6-digit pincode');
      return;
    }

    if (pincode !== confirmPincode) {
      setError('Pincodes do not match');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      
      // Check if chat exists in localStorage
      const chatData = localStorage.getItem(`chat_${pincode}`);
      if (chatData) {
        const parsedData = JSON.parse(chatData);
        setMessages(parsedData.messages || []);
      } else {
        // Create new chat
        const newChat = { messages: [] };
        localStorage.setItem(`chat_${pincode}`, JSON.stringify(newChat));
        setMessages([]);
      }
      setShowChat(true);
    } catch (err) {
      setError('Failed to load chat. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserDisplayName = () => {
    if (currentUser) {
      if (currentUser.name && currentUser.phone) {
        return `${currentUser.name} (${currentUser.phone})`;
      } else if (currentUser.name) {
        return currentUser.name;
      } else if (currentUser.phone) {
        return currentUser.phone;
      }
    }
    return 'Anonymous';
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !pincode) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: getUserDisplayName(),
      timestamp: new Date().toISOString(),
      isAnonymous: !currentUser,
      userDetails: currentUser ? {
        name: currentUser.name || null,
        phone: currentUser.phone || null,
        email: currentUser.email || null
      } : null
    };

    try {
      // Add message to local state
      setMessages(prev => [...prev, message]);
      setNewMessage('');

      // Save to localStorage
      const chatData = localStorage.getItem(`chat_${pincode}`);
      const parsedData = chatData ? JSON.parse(chatData) : { messages: [] };
      parsedData.messages.push(message);
      localStorage.setItem(`chat_${pincode}`, JSON.stringify(parsedData));
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
    }
  };

  if (!showChat) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Connect with Your Community</h1>
            <p className="mt-2 text-gray-600">Enter your pincode to join or create a community chat</p>
          </div>

          <form onSubmit={handlePincodeSubmit} className="space-y-6">
            <div>
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                Enter Pincode
              </label>
              <input
                type="text"
                id="pincode"
                value={pincode}
                onChange={handlePincodeChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter 6-digit pincode"
                maxLength={6}
                inputMode="numeric"
                pattern="[0-9]*"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                {pincode.length}/6 digits
              </p>
            </div>

            <div>
              <label htmlFor="confirmPincode" className="block text-sm font-medium text-gray-700">
                Confirm Pincode
              </label>
              <input
                type="text"
                id="confirmPincode"
                value={confirmPincode}
                onChange={handleConfirmPincodeChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Confirm 6-digit pincode"
                maxLength={6}
                inputMode="numeric"
                pattern="[0-9]*"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                {confirmPincode.length}/6 digits
              </p>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              disabled={pincode.length !== 6 || confirmPincode.length !== 6}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                pincode.length === 6 && confirmPincode.length === 6
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {isLoading ? 'Loading...' : 'Join Community Chat'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Community Chat - {pincode}</h1>
          <p className="mt-2 text-gray-600">
            {currentUser ? `Logged in as ${getUserDisplayName()}` : 'You are chatting as Anonymous'}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Chat Messages */}
          <div className="h-[60vh] overflow-y-auto p-4 space-y-4">
            {messages.map((message) => {
              // Determine display for each message
              let displaySender = message.sender;
              if (!message.isAnonymous && message.userDetails) {
                if (message.userDetails.name && message.userDetails.phone) {
                  displaySender = `${message.userDetails.name} (${message.userDetails.phone})`;
                } else if (message.userDetails.name) {
                  displaySender = message.userDetails.name;
                } else if (message.userDetails.phone) {
                  displaySender = message.userDetails.phone;
                }
              }
              return (
                <div
                  key={message.id}
                  className={`flex ${message.sender === getUserDisplayName() ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === getUserDisplayName()
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="text-sm font-medium">{displaySender}</div>
                    <div className="text-sm mt-1">{message.text}</div>
                    <div className="text-xs opacity-70 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSendMessage} className="flex space-x-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={`Type your message as ${getUserDisplayName()}...`}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        {error && (
          <div className="mt-4 text-red-600 text-sm text-center">{error}</div>
        )}
      </div>
    </div>
  );
};

export default CommunityChats; 