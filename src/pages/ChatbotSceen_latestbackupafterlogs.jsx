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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // const handleSend = async () => {
  //   if (inputText.trim()) {
  //     const newMessage = {
  //       id: messages.length + 1,
  //       text: inputText,
  //       sender: 'user',
  //       timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
  //       sources: [],
  //       summary: null
  //     };

  //     setMessages([...messages, newMessage]);
  //     const userQuery = inputText;
  //     setInputText('');

  //     // Simulate bot typing
  //     setIsTyping(true);

  //     try {
  //       // Call search API - now returns { results, summary }
  //       const searchData = await searchAPI(userQuery);

  //       setTimeout(() => {
  //         setIsTyping(false);
  //         const botResponse = {
  //           id: messages.length + 2,
  //           text: searchData.summary || (searchData.results.length > 0
  //             ? "I found some relevant information for your query. Please check the sources below for detailed documentation."
  //             : "I've received your message, but couldn't find specific documentation. How else can I assist you?"),
  //           sender: 'bot',
  //           timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
  //           sources: searchData.results || [],
  //           summary: searchData.summary || null
  //         };
  //         setMessages(prev => [...prev, botResponse]);
  //       }, 1500);

  //     } catch (error) {
  //       setIsTyping(false);
  //       const errorResponse = {
  //         id: messages.length + 2,
  //         text: "I'm sorry, I encountered an error while searching. Please try again.",
  //         sender: 'bot',
  //         timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
  //         sources: [],
  //         summary: null
  //       };
  //       setMessages(prev => [...prev, errorResponse]);
  //     }
  //   }
  // };


  const handleSend = async () => {
    if (!inputText.trim()) return;

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

    // Create placeholder bot message
    const botMsgId = messages.length + 2;
    setMessages(prev => [
      ...prev,
      {
        id: botMsgId,
        text: "",
        sender: "bot",
        sources: [],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);

    try {
      const result = await searchAPI(
        userQuery,
        false,

        // 🔥 STREAMING CALLBACK
        (partialText) => {
          setMessages(prev => {
            const updated = [...prev];
            const msg = updated.find(m => m.id === botMsgId);
            if (msg) msg.text = cleanStreamText(partialText);
            return updated;
          });
        }
      );

      // STREAM ENDED → Apply final summary + sources

// STREAM ENDED → Apply FINAL_RESULTS
setMessages(prev => {
  const updated = [...prev];
  const msg = updated.find(m => m.id === botMsgId);

  if (msg) {
    const hasSummary = result.summary && result.summary.trim() !== "";
    const hasSources = result.results && result.results.length > 0;

    // Same logic as old Chatbot
    msg.text =
      hasSummary
        ? result.summary
        : hasSources
        ? "I found some relevant information for your query. Please check the sources below for detailed documentation."
        : "I've received your message, but couldn't find specific documentation. How else can I assist you?";

    msg.sources = result.results || [];
    msg.summary = result.summary || null;
  }

  return updated;
});


    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: messages.length + 3,
          text: "I'm sorry, something went wrong. Please try again.",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }

    setIsTyping(false);
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
    const messageIndex = messages.findIndex(msg => msg.id === messageId);
    if (messageIndex <= 0) return;

    const userMessage = messages[messageIndex - 1];
    if (userMessage.sender !== "user") return;

    const userQuery = userMessage.text;

    setIsTyping(true);

    // Reuse the same bot message
    const botMsgId = messageId;

    // Clear old text (start fresh)
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
      const result = await searchAPI(
        userQuery,
        true,  // rethink mode

        // STREAM LOGS
        (partialText) => {
          setMessages(prev => {
            const updated = [...prev];
            const msg = updated.find(m => m.id === botMsgId);
            if (msg) msg.text = cleanStreamText(partialText);
            return updated;
          });
        }
      );

      // FINAL RESULTS
      setMessages(prev => {
        const updated = [...prev];
        const msg = updated.find(m => m.id === botMsgId);

        if (msg) {
          const hasSummary = result.summary?.trim();
          const hasSources = result.results?.length > 0;

          msg.text =
            hasSummary
              ? result.summary
              : hasSources
              ? "I found relevant information after rethinking. Please check the sources below."
              : "I re-evaluated, but couldn't find new information.";

          msg.sources = result.results || [];
          msg.summary = result.summary || null;
          msg.timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        }

        return updated;
      });

    } catch (err) {
      console.error("Rethink error:", err);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageId
            ? { ...msg, text: "Rethink failed. Please try again." }
            : msg
        )
      );
    }

    setIsTyping(false);
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
