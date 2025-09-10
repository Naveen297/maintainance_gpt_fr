// ChatbotScreen/ChatbotScreen.js
import React, { useState, useRef, useEffect } from 'react';
import Header from './Header';
import MessageArea from './MessageArea';
import InputArea from './InputArea';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { searchAPI, sourceAPI } from './api';

const ChatbotScreen = ({ onLogout }) => {
  const [theme, setTheme] = useState('dark');
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hello! I'm your AI assistant. How can I help you today?", 
      sender: 'bot', 
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      sources: []
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        sources: []
      };
      
      setMessages([...messages, newMessage]);
      const userQuery = inputText;
      setInputText('');
      
      // Simulate bot typing
      setIsTyping(true);
      
      try {
        // Call search API
        const searchResults = await searchAPI(userQuery);
        
        setTimeout(() => {
          setIsTyping(false);
          const botResponse = {
            id: messages.length + 2,
            text: searchResults.length > 0 
              ? "I found some relevant information for your query. Please check the sources below for detailed documentation."
              : "I've received your message, but couldn't find specific documentation. How else can I assist you?",
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            sources: searchResults
          };
          setMessages(prev => [...prev, botResponse]);
        }, 1500);
        
      } catch (error) {
        setIsTyping(false);
        const errorResponse = {
          id: messages.length + 2,
          text: "I'm sorry, I encountered an error while searching. Please try again.",
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          sources: []
        };
        setMessages(prev => [...prev, errorResponse]);
      }
    }
  };

  const handleSourceClick = async (source, pageNo, textContent = null) => {
    if (textContent) {
      // Handle Excel files with text content
      setSelectedImage({
        source,
        pageNo: null,
        textContent,
        type: 'text'
      });
      setSidebarOpen(true);
    } else if (pageNo) {
      // Handle PDF files - fetch image from API
      const imageData = await sourceAPI(source, pageNo, setLoadingImage);
      if (imageData) {
        setSelectedImage({
          source,
          pageNo,
          image: imageData,
          type: 'image'
        });
        setSidebarOpen(true);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const isDark = theme === 'dark';

  return (
    <div className={`flex flex-col h-screen transition-all duration-300 ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        
      <Header 
        isDark={isDark}
        toggleTheme={toggleTheme}
        showUserMenu={showUserMenu}
        setShowUserMenu={setShowUserMenu}
        onLogout={onLogout}
      />

      <MessageArea 
        messages={messages}
        isTyping={isTyping}
        isDark={isDark}
        handleSourceClick={handleSourceClick}
        messagesEndRef={messagesEndRef}
      />

      <InputArea 
        inputText={inputText}
        setInputText={setInputText}
        handleSend={handleSend}
        handleKeyPress={handleKeyPress}
        isTyping={isTyping}
        isDark={isDark}
      />

      <Footer isDark={isDark} />

      <Sidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        selectedImage={selectedImage}
        loadingImage={loadingImage}
        isDark={isDark}
      />

      {/* Overlay for sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default ChatbotScreen;

// // ChatbotScreen/ChatbotScreen.js
// import React, { useState, useRef, useEffect } from 'react';
// import Header from './Header';
// import MessageArea from './MessageArea';
// import InputArea from './InputArea';
// import Footer from './Footer';
// import Sidebar from './Sidebar';
// import { searchAPI, sourceAPI } from './api';

// const ChatbotScreen = ({ onLogout }) => {
//   const [theme, setTheme] = useState('dark');
//   const [messages, setMessages] = useState([
//     { 
//       id: 1, 
//       text: "Hello! I'm your AI assistant. How can I help you today?", 
//       sender: 'bot', 
//       timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
//       sources: []
//     }
//   ]);
//   const [inputText, setInputText] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [loadingImage, setLoadingImage] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSend = async () => {
//     if (inputText.trim()) {
//       const newMessage = {
//         id: messages.length + 1,
//         text: inputText,
//         sender: 'user',
//         timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
//         sources: []
//       };
      
//       setMessages([...messages, newMessage]);
//       const userQuery = inputText;
//       setInputText('');
      
//       // Simulate bot typing
//       setIsTyping(true);
      
//       try {
//         // Call search API
//         const searchResults = await searchAPI(userQuery);
        
//         setTimeout(() => {
//           setIsTyping(false);
//           const botResponse = {
//             id: messages.length + 2,
//             text: searchResults.length > 0 
//               ? "I found some relevant information for your query. Please check the sources below for detailed documentation."
//               : "I've received your message, but couldn't find specific documentation. How else can I assist you?",
//             sender: 'bot',
//             timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
//             sources: searchResults
//           };
//           setMessages(prev => [...prev, botResponse]);
//         }, 1500);
        
//       } catch (error) {
//         setIsTyping(false);
//         const errorResponse = {
//           id: messages.length + 2,
//           text: "I'm sorry, I encountered an error while searching. Please try again.",
//           sender: 'bot',
//           timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
//           sources: []
//         };
//         setMessages(prev => [...prev, errorResponse]);
//       }
//     }
//   };

//   const handleSourceClick = async (source, pageNo) => {
//     const imageData = await sourceAPI(source, pageNo, setLoadingImage);
//     if (imageData) {
//       setSelectedImage({
//         source,
//         pageNo,
//         image: imageData
//       });
//       setSidebarOpen(true);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   const toggleTheme = () => {
//     setTheme(theme === 'dark' ? 'light' : 'dark');
//   };

//   const toggleRecording = () => {
//     setIsRecording(!isRecording);
//   };

//   const isDark = theme === 'dark';

//   return (
//     <div className={`flex flex-col h-screen transition-all duration-300 ${
//         isDark ? 'bg-gray-900' : 'bg-gray-50'
//       }`}>
        
//       <Header 
//         isDark={isDark}
//         toggleTheme={toggleTheme}
//         showUserMenu={showUserMenu}
//         setShowUserMenu={setShowUserMenu}
//         onLogout={onLogout}
//       />

//       <MessageArea 
//         messages={messages}
//         isTyping={isTyping}
//         isDark={isDark}
//         handleSourceClick={handleSourceClick}
//         messagesEndRef={messagesEndRef}
//       />

//       <InputArea 
//         inputText={inputText}
//         setInputText={setInputText}
//         handleSend={handleSend}
//         handleKeyPress={handleKeyPress}
//         isTyping={isTyping}
//         isDark={isDark}
//       />

//       <Footer isDark={isDark} />

//       <Sidebar 
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//         selectedImage={selectedImage}
//         loadingImage={loadingImage}
//         isDark={isDark}
//       />

//       {/* Overlay for sidebar */}
//       {sidebarOpen && (
//         <div 
//           className="fixed inset-0 z-40 bg-black bg-opacity-50"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default ChatbotScreen;