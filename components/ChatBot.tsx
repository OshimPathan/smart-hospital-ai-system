'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic, MicOff, Volume2, Globe } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'ne', name: 'Nepali', flag: '🇳🇵' },
  { code: 'ta', name: 'Tamil', flag: '🇮🇳' },
];

const QUICK_REPLIES = [
  'Book an appointment',
  'Find a doctor',
  'Check queue status',
  'Emergency services',
  'View health records',
  'Department information',
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! 👋 I\'m your AI healthcare assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showLanguages, setShowLanguages] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const getBotResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const message = userMessage.toLowerCase();

    // Intent detection
    if (message.includes('appointment') || message.includes('book')) {
      return 'I can help you book an appointment! 📅 Which department would you like to visit?\n\n• Cardiology\n• Neurology\n• Orthopedics\n• General Medicine\n• Other\n\nPlease specify the department.';
    }
    
    if (message.includes('doctor') || message.includes('find')) {
      return 'I\'ll help you find the right doctor! 👨‍⚕️ Could you tell me:\n\n1. Which department?\n2. Any specific symptoms?\n3. Preferred time slot?\n\nThis will help me suggest the best available doctor.';
    }
    
    if (message.includes('queue') || message.includes('status') || message.includes('wait')) {
      return 'You can check your queue status in real-time! 🕐\n\nCurrent average wait time: 25 minutes\n\nWould you like me to:\n• Check your current position\n• Get estimated wait time\n• View token details';
    }
    
    if (message.includes('emergency') || message.includes('urgent')) {
      return '🚨 For medical emergencies, please:\n\n1. Call: +91 123-456-7890\n2. Or tap the Emergency SOS button on our app\n\nFor non-urgent issues, I can help you book a priority appointment. Would you like that?';
    }
    
    if (message.includes('record') || message.includes('history')) {
      return 'Your health records are securely stored! 📋\n\nYou can access:\n• Past prescriptions\n• Lab reports\n• Consultation history\n• Vaccination records\n\nPlease login to view your complete health profile.';
    }
    
    if (message.includes('cardiology') || message.includes('heart')) {
      return '❤️ Cardiology Department\n\nAvailable Doctors:\n• Dr. Sarah Johnson (10+ yrs exp)\n• Dr. Michael Chen (15+ yrs exp)\n\nConsultation Fee: ₹800\nAvailable: Mon-Sat, 9 AM - 5 PM\n\nWould you like to book an appointment?';
    }
    
    if (message.includes('yes') || message.includes('sure') || message.includes('ok')) {
      return 'Great! Please provide your phone number and preferred date/time, or you can login to your account to book instantly. 😊';
    }

    if (message.includes('thank') || message.includes('thanks')) {
      return 'You\'re welcome! 😊 Is there anything else I can help you with today?';
    }

    // Default response
    return 'I understand you need assistance. I can help you with:\n\n• 📅 Booking appointments\n• 👨‍⚕️ Finding doctors\n• ⏱️ Queue status\n• 📋 Health records\n• 🏥 Department info\n• 🚨 Emergency services\n\nWhat would you like to know more about?';
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const botResponseText = await getBotResponse(inputValue);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: botResponseText,
      sender: 'bot',
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, botMessage]);
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    setTimeout(() => handleSend(), 100);
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setInputValue('I want to book an appointment');
        setIsListening(false);
      }, 2000);
    }
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage === 'hi' ? 'hi-IN' : selectedLanguage === 'ta' ? 'ta-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 group"
      >
        {isOpen ? (
          <X className="w-7 h-7" />
        ) : (
          <>
            <MessageCircle className="w-7 h-7" />
            <span className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full flex items-center justify-center text-xs animate-pulse">
              1
            </span>
          </>
        )}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div
          id="chatbot-widget"
          className="fixed bottom-24 right-6 z-50 w-full max-w-md h-[600px] glass-effect rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">AI Healthcare Assistant</h3>
                <div className="flex items-center space-x-1 text-xs">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Online 24/7</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowLanguages(!showLanguages)}
                className="p-2 hover:bg-white/10 rounded-lg transition relative"
              >
                <Globe className="w-5 h-5" />
                {showLanguages && (
                  <div className="absolute top-full right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-xl p-2 w-32 z-10">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSelectedLanguage(lang.code);
                          setShowLanguages(false);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded flex items-center space-x-2"
                      >
                        <span>{lang.flag}</span>
                        <span className="text-sm">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : 'bg-white text-gray-800 rounded-bl-sm shadow-md'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  {message.sender === 'bot' && (
                    <button
                      onClick={() => speakMessage(message.text)}
                      className="mt-2 text-xs text-blue-600 flex items-center space-x-1 hover:underline"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>Listen</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-white rounded-2xl rounded-bl-sm shadow-md px-4 py-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-4 py-2 bg-white border-t overflow-x-auto">
            <div className="flex space-x-2">
              {QUICK_REPLIES.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="flex-shrink-0 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs hover:bg-blue-100 transition"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t flex items-center space-x-2">
            <button
              onClick={toggleVoice}
              className={`p-2 rounded-lg transition ${
                isListening ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5 animate-pulse" /> : <Mic className="w-5 h-5" />}
            </button>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
