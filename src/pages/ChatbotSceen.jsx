import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import MessageArea from '../components/MessageArea';
import InputArea from '../components/InputArea';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { searchAPI, sourceAPI } from '../services/api';

const cleanStreamText = (text) => {
  if (!text) return "";
  if (text.trim().startsWith("FINAL_RESULTS::")) return "";
  if (text.startsWith("Expanded:")) return "🔧 Expanding query...";
  return text;
};

const ChatbotScreen = ({ onLogout }) => {
  const [theme, setTheme] = useState('dark');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      sources: [],
      summary: null
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
  const [isStreaming, setIsStreaming] = useState(false);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  useEffect(() => {
    scrollToBottom();
  }, [messages]);


const handleSend = async () => {
  if (!inputText.trim()) return;

  setIsStreaming(true);   // 🔥 disable rethink buttons

  const newMessage = {
    id: messages.length + 1,
    text: inputText,
    sender: "user",
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    sources: [],
    summary: null,
  };

  setMessages(prev => [...prev, newMessage]);

  const userQuery = inputText;
  setInputText("");
  setIsTyping(true);

  const botMsgId = messages.length + 2;

  // placeholder bot message
  setMessages(prev => [
    ...prev,
    {
      id: botMsgId,
      text: "",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sources: [],
      summary: null
    }
  ]);

  try {
    const result = await searchAPI(userQuery, false, (partialText) => {
      setMessages(prev => {
        const updated = [...prev];
        const msg = updated.find(m => m.id === botMsgId);
        if (msg) msg.text = cleanStreamText(partialText);
        return updated;
      });
    });

    // Final summary + sources
    setMessages(prev => {
      const updated = [...prev];
      const msg = updated.find(m => m.id === botMsgId);

      if (msg) {
        msg.text = result.summary || "I found relevant information for your query.";
        msg.sources = result.results;
        msg.summary = result.summary;
      }

      return updated;
    });

  } catch (error) {
    console.error(error);
  }

  setIsTyping(false);
  setIsStreaming(false);   // 🔥 enable rethink buttons again
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
      // Handle PDF files - fetch image from API using updated sourceAPI
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

  const handleRethink = async (messageId) => {
  if (isStreaming) return;   // 🔥 block rethink while streaming

  setIsStreaming(true);       // 🔥 disable rethink buttons
  setIsTyping(true);

  const messageIndex = messages.findIndex(msg => msg.id === messageId);
  if (messageIndex <= 0) return;

  const userMessage = messages[messageIndex - 1];
  if (userMessage.sender !== "user") return;

  const userQuery = userMessage.text;
  const botMsgId = messageId;

  // Reset previous content
  setMessages(prev => {
    const updated = [...prev];
    const msg = updated.find(m => m.id === botMsgId);
    if (msg) {
      msg.text = "🔄 Rethinking your query...";
      msg.sources = [];
    }
    return updated;
  });

  try {
    const result = await searchAPI(userQuery, true, (partialText) => {
      setMessages(prev => {
        const updated = [...prev];
        const msg = updated.find(m => m.id === botMsgId);
        if (msg) msg.text = cleanStreamText(partialText);
        return updated;
      });
    });

    // FINAL RESULTS
    setMessages(prev => {
      const updated = [...prev];
      const msg = updated.find(m => m.id === botMsgId);

      if (msg) {
        msg.text = result.summary || "I found relevant information after rethinking.";
        msg.sources = result.results;   // 🔥 HERE is your FIX!
        msg.summary = result.summary;
      }
      return updated;
    });

  } catch (error) {
    console.error("Rethink error:", error);
  }

  setIsTyping(false);
  setIsStreaming(false);   // 🔥 enable rethink buttons again
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
        handleRethink={handleRethink}
        messagesEndRef={messagesEndRef}
        isStreaming={isStreaming}
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
