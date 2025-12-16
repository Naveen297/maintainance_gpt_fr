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

  // 🛑 AbortController for stopping requests
  const abortControllerRef = useRef(null);
  const lastResponseRef = useRef(null); // Store last response for rethink


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 🛑 Stop handler - cancels ongoing requests
  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsTyping(false);
    setIsStreaming(false);
  };

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

  // 🛑 Create new AbortController
  abortControllerRef.current = new AbortController();

  try {
    const result = await searchAPI(userQuery, false, (partialText) => {
      setMessages(prev => {
        const updated = [...prev];
        const msg = updated.find(m => m.id === botMsgId);
        if (msg) msg.text = cleanStreamText(partialText);
        return updated;
      });
    }, abortControllerRef.current.signal);

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
    if (error.name !== 'AbortError') {
      console.error(error);
    }
  }

  setIsTyping(false);
  setIsStreaming(false);   // 🔥 enable rethink buttons again
  abortControllerRef.current = null;
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
  if (messageIndex <= 0) {
    setIsTyping(false);
    setIsStreaming(false);
    return;
  }

  const userMessage = messages[messageIndex - 1];
  if (userMessage.sender !== "user") {
    setIsTyping(false);
    setIsStreaming(false);
    return;
  }

  const userQuery = userMessage.text;
  const botMsgId = messageId;

  // 💾 Save current message as last response before rethinking
  const currentMsg = messages.find(m => m.id === botMsgId);
  if (currentMsg) {
    lastResponseRef.current = {
      text: currentMsg.text || "I found relevant information for your query.",
      sources: currentMsg.sources || [],
      summary: currentMsg.summary || null
    };
  } else {
    // Fallback if message not found
    lastResponseRef.current = {
      text: "I found relevant information for your query.",
      sources: [],
      summary: null
    };
  }

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

  // 🛑 Create new AbortController
  abortControllerRef.current = new AbortController();

  try {
    const result = await searchAPI(userQuery, true, (partialText) => {
      setMessages(prev => {
        const updated = [...prev];
        const msg = updated.find(m => m.id === botMsgId);
        if (msg) msg.text = cleanStreamText(partialText);
        return updated;
      });
    }, abortControllerRef.current.signal);

    // FINAL RESULTS (only if not aborted)
    if (result && !result.wasAborted) {
      setMessages(prev => {
        const updated = [...prev];
        const msg = updated.find(m => m.id === botMsgId);

        if (msg) {
          msg.text = result.summary || "I found relevant information after rethinking.";
          msg.sources = result.results || [];
          msg.summary = result.summary || null;
        }
        return updated;
      });
    } else if (result && result.wasAborted) {
      // 🛑 Restore last response when stopped
      if (lastResponseRef.current) {
        setMessages(prev => {
          const updated = [...prev];
          const msg = updated.find(m => m.id === botMsgId);

          if (msg && lastResponseRef.current) {
            msg.text = lastResponseRef.current.text || "Response stopped.";
            msg.sources = lastResponseRef.current.sources || [];
            msg.summary = lastResponseRef.current.summary || null;
          }
          return updated;
        });
      }
    }

  } catch (error) {
    if (error.name === 'AbortError') {
      // 🛑 Restore last response when aborted
      console.log("Request was aborted, restoring last response");
      if (lastResponseRef.current) {
        setMessages(prev => {
          const updated = [...prev];
          const msg = updated.find(m => m.id === botMsgId);

          if (msg && lastResponseRef.current) {
            msg.text = lastResponseRef.current.text || "Response stopped.";
            msg.sources = lastResponseRef.current.sources || [];
            msg.summary = lastResponseRef.current.summary || null;
          }
          return updated;
        });
      } else {
        // Fallback if no saved response
        setMessages(prev => {
          const updated = [...prev];
          const msg = updated.find(m => m.id === botMsgId);
          if (msg) {
            msg.text = "Response stopped by user.";
            msg.sources = [];
            msg.summary = null;
          }
          return updated;
        });
      }
    } else {
      console.error("Rethink error:", error);
      // Show error message to user
      setMessages(prev => {
        const updated = [...prev];
        const msg = updated.find(m => m.id === botMsgId);
        if (msg) {
          msg.text = "Sorry, an error occurred while rethinking. Please try again.";
          msg.sources = [];
          msg.summary = null;
        }
        return updated;
      });
    }
  }

  setIsTyping(false);
  setIsStreaming(false);   // 🔥 enable rethink buttons again
  abortControllerRef.current = null;
  lastResponseRef.current = null; // Clear saved response
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
        handleStop={handleStop}
        isStreaming={isStreaming}
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
