
// import React, { useState, useRef, useEffect } from 'react';
// import { Send, Moon, Sun, Mic, StopCircle, User, Bot, Settings, Bell, ChevronDown, FileText, X, ExternalLink, Search, Loader } from 'lucide-react';
// import DarkIcon from '../assets/DarkIcon.png';
// import LightIcon from '../assets/LightIcon.png';
// import MAI_Logo from '../assets/MAI_Logo.png'

// const ChatbotScreen = ({ onLogout }) => {
//     const [theme, setTheme] = useState('dark');
//     const [messages, setMessages] = useState([
//       { 
//         id: 1, 
//         text: "Hello! I'm your AI assistant. How can I help you today?", 
//         sender: 'bot', 
//         timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
//         sources: []
//       }
//     ]);
//     const [inputText, setInputText] = useState('');
//     const [isTyping, setIsTyping] = useState(false);
//     const [isRecording, setIsRecording] = useState(false);
//     const [showUserMenu, setShowUserMenu] = useState(false);
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [loadingImage, setLoadingImage] = useState(false);
//     const messagesEndRef = React.useRef(null);
  
//     const scrollToBottom = () => {
//       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     };
  
//     React.useEffect(() => {
//       scrollToBottom();
//     }, [messages]);

//     // API call for search
//     const searchAPI = async (query) => {
//       try {
//         const response = await fetch("http://localhost:8000/search", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ query }),
//         });
        
//         if (!response.ok) {
//           throw new Error('Search API failed');
//         }
        
//         const data = await response.json();
//         return data.results || [];
//       } catch (error) {
//         console.error('Search API error:', error);
//         return [];
//       }
//     };

//     // API call for source image
//     const sourceAPI = async (source, pageNo) => {
//       try {
//         setLoadingImage(true);
//         const response = await fetch("http://localhost:8000/source", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ source, pageNo }),
//         });
        
//         if (!response.ok) {
//           throw new Error('Source API failed');
//         }
        
//         const data = await response.json();
//         return data.image;
//       } catch (error) {
//         console.error('Source API error:', error);
//         return null;
//       } finally {
//         setLoadingImage(false);
//       }
//     };
  
//     const handleSend = async () => {
//       if (inputText.trim()) {
//         const newMessage = {
//           id: messages.length + 1,
//           text: inputText,
//           sender: 'user',
//           timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
//           sources: []
//         };
        
//         setMessages([...messages, newMessage]);
//         const userQuery = inputText;
//         setInputText('');
        
//         // Simulate bot typing
//         setIsTyping(true);
        
//         try {
//           // Call search API
//           const searchResults = await searchAPI(userQuery);
          
//           setTimeout(() => {
//             setIsTyping(false);
//             const botResponse = {
//               id: messages.length + 2,
//               text: searchResults.length > 0 
//                 ? "I found some relevant information for your query. Please check the sources below for detailed documentation."
//                 : "I've received your message, but couldn't find specific documentation. How else can I assist you?",
//               sender: 'bot',
//               timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
//               sources: searchResults
//             };
//             setMessages(prev => [...prev, botResponse]);
//           }, 1500);
          
//         } catch (error) {
//           setIsTyping(false);
//           const errorResponse = {
//             id: messages.length + 2,
//             text: "I'm sorry, I encountered an error while searching. Please try again.",
//             sender: 'bot',
//             timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
//             sources: []
//           };
//           setMessages(prev => [...prev, errorResponse]);
//         }
//       }
//     };

//     const handleSourceClick = async (source, pageNo) => {
//       const imageData = await sourceAPI(source, pageNo);
//       if (imageData) {
//         setSelectedImage({
//           source,
//           pageNo,
//           image: imageData
//         });
//         setSidebarOpen(true);
//       }
//     };
  
//     const handleKeyPress = (e) => {
//       if (e.key === 'Enter' && !e.shiftKey) {
//         e.preventDefault();
//         handleSend();
//       }
//     };
  
//     const toggleTheme = () => {
//       setTheme(theme === 'dark' ? 'light' : 'dark');
//     };
  
//     const toggleRecording = () => {
//       setIsRecording(!isRecording);
//     };
  
//     const isDark = theme === 'dark';

//     const SourceCard = ({ source, pageNo, score, onClick }) => (
//       <div 
//         onClick={() => onClick(source, pageNo)}
//         className={`group cursor-pointer p-3 rounded-lg border transition-all duration-200 hover:scale-[1.02] ${
//           isDark 
//             ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 hover:border-red-500/30' 
//             : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-red-400/30'
//         }`}
//       >
//         <div className="flex items-start justify-between">
//           <div className="flex items-start flex-1 min-w-0 space-x-2">
//             <FileText className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
//               isDark ? 'text-red-400' : 'text-red-500'
//             }`} />
//             <div className="flex-1 min-w-0">
//               <p className={`text-sm font-medium truncate ${
//                 isDark ? 'text-gray-200' : 'text-gray-800'
//               }`}>
//                 {source}
//               </p>
//               <p className={`text-xs ${
//                 isDark ? 'text-gray-400' : 'text-gray-600'
//               }`}>
//                 Page {pageNo} • Score: {(score * 100).toFixed(1)}%
//               </p>
//             </div>
//           </div>
//           <ExternalLink className={`w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ${
//             isDark ? 'text-gray-400' : 'text-gray-600'
//           }`} />
//         </div>
//       </div>
//     );

//     const Sidebar = () => (
//       <div className={`fixed inset-y-0 right-0 w-96 z-50 transform transition-transform duration-300 ease-in-out ${
//         sidebarOpen ? 'translate-x-0' : 'translate-x-full'
//       } ${isDark ? 'bg-gray-900' : 'bg-white'} border-l ${
//         isDark ? 'border-gray-700' : 'border-gray-200'
//       }`}>
//         <div className="flex items-center justify-between p-4 border-b border-gray-700">
//           <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
//             Document Viewer
//           </h3>
//           <button
//             onClick={() => setSidebarOpen(false)}
//             className={`p-2 rounded-lg hover:bg-gray-700 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>
        
//         {selectedImage && (
//           <div className="p-4">
//             <div className={`mb-4 p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
//               <h4 className={`font-medium text-sm ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
//                 {selectedImage.source}
//               </h4>
//               <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//                 Page {selectedImage.pageNo}
//               </p>
//             </div>
            
//             {loadingImage ? (
//               <div className="flex items-center justify-center h-96">
//                 <Loader className={`w-8 h-8 animate-spin ${isDark ? 'text-red-400' : 'text-red-500'}`} />
//               </div>
//             ) : (
//               <div className="relative">
//                 <img
//                   src={`data:image/png;base64,${selectedImage.image}`}
//                   alt={`Page ${selectedImage.pageNo}`}
//                   className="w-full h-auto rounded-lg shadow-lg"
//                 />
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     );
  
//     return (
//       <div className={`flex flex-col h-screen transition-all duration-300 ${
//           isDark ? 'bg-gray-900' : 'bg-gray-50'
//         }`}>
          
//         {/* Enhanced Header */}
//         <header className={`relative flex items-center justify-between px-8 py-4 border-b transition-all duration-300 ${
//           isDark ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-r from-white via-gray-50 to-white border-gray-200'
//         }`}>
//           {/* Left side - Logo and branding */}
//           <div className="flex items-center space-x-4">
//             <div className={`relative p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
//               isDark ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/25' : 'bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/20'
//             }`}>
//               <div className="absolute inset-0 rounded-xl bg-white/20"></div>
//               <svg className="relative z-10 text-white w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
//               </svg>
//             </div>
            
//             <div className="flex flex-col font-georama">
//               <div className={`text-2xl font-bold tracking-tight ${
//                 isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300' : 'text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600'
//               }`}>
//                 MaintenanceAI
//               </div>
//               <div className={`text-xs font-medium tracking-wider uppercase ${
//                 isDark ? 'text-red-400' : 'text-red-500'
//               }`}>
//                 Intelligent Operations Platform
//               </div>
//             </div>
//           </div>

//           {/* Right side - Controls */}
//           <div className="flex items-center space-x-3">
//             {/* Settings */}
//             <button className={`p-2.5 rounded-lg transition-all duration-200 hover:scale-105 ${
//               isDark ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white' : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/80 hover:text-gray-800'
//             }`}>
//               <Settings className="w-5 h-5" />
//             </button>

//             {/* Theme toggle */}
//             <button
//               onClick={toggleTheme}
//               className={`p-2.5 rounded-lg transition-all duration-200 hover:scale-105 ${
//                 isDark ? 'bg-gray-700/50 text-yellow-400 hover:bg-gray-600/50' : 'bg-gray-100/80 text-orange-500 hover:bg-gray-200/80'
//               }`}
//             >
//               {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//             </button>

//             {/* User menu */}
//             <div className="relative">
//               <button 
//                 onClick={() => setShowUserMenu(!showUserMenu)}
//                 className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
//                   isDark ? 'text-gray-300 bg-gray-700/50 hover:bg-gray-600/50' : 'text-gray-600 bg-gray-100/80 hover:bg-gray-200/80'
//                 }`}
//               >
//                 <div className={`flex justify-center items-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full`}>
//                   <User className="w-4 h-4 text-white" />
//                 </div>
//                 <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
//               </button>

//               {/* User dropdown */}
//               {showUserMenu && (
//                 <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl border transition-all duration-200 z-50 font-georama ${
//                   isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
//                 }`}>
//                   <div className="py-2">
//                     <div className={`px-4 py-2 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
//                       <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>Admin</div>
//                     </div>
//                     <button className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700'}`}>
//                       Profile Settings
//                     </button>
//                     <button className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700'}`}>
//                       Preferences
//                     </button>
//                     <hr className={`my-2 ${isDark ? 'border-gray-700' : 'border-gray-200'}`} />
//                     <button 
//                       onClick={onLogout}
//                       className={`w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50 ${isDark ? 'hover:bg-red-900/20' : ''}`}
//                     >
//                       Sign Out
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </header>

//         {/* Messages Area */}
//         <div className="flex-1 px-4 py-6 overflow-y-auto font-georamalight">
//           <div className="max-w-4xl mx-auto space-y-4">
//             {messages.map((message) => (
//               <div
//                 key={message.id}
//                 className={`flex items-start space-x-3 ${
//                   message.sender === 'user' ? 'justify-end' : 'justify-start'
//                 }`}
//               >
//                 {message.sender === 'bot' && (
//                   <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
//                     isDark ? 'bg-gradient-to-br from-red-500 to-red-600' : 'bg-gradient-to-br from-red-400 to-red-500'
//                   }`}>
//                     <Bot className="w-5 h-5 text-white" />
//                   </div>
//                 )}
                
//                 <div className={`group relative max-w-md ${message.sender === 'user' ? 'order-1' : ''}`}>
//                   <div className={`px-4 py-3 rounded-2xl transition-all duration-300 ${
//                     message.sender === 'user'
//                       ? isDark 
//                         ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' 
//                         : 'bg-gradient-to-r from-red-400 to-red-500 text-white'
//                       : isDark
//                         ? 'bg-gray-800 text-gray-100 border border-gray-700'
//                         : 'bg-white text-gray-800 border border-gray-200'
//                   }`}>
//                     <p className="text-sm leading-relaxed">{message.text}</p>
//                   </div>
                  
//                   {/* Sources section for bot messages */}
//                   {message.sender === 'bot' && message.sources && message.sources.length > 0 && (
//                     <div className="mt-3 space-y-2">
//                       <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//                         <Search className="inline w-3 h-3 mr-1" />
//                         Sources found ({message.sources.length})
//                       </div>
//                       {message.sources.map((source, index) => (
//                         <SourceCard
//                           key={index}
//                           source={source.source}
//                           pageNo={source.pageNo}
//                           score={source.score}
//                           onClick={handleSourceClick}
//                         />
//                       ))}
//                     </div>
//                   )}
                  
//                   <p className={`text-xs mt-1 transition-colors duration-300 ${
//                     message.sender === 'user' ? 'text-right' : 'text-left'
//                   } ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
//                     {message.timestamp}
//                   </p>
//                 </div>

//                 {message.sender === 'user' && (
//                   <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 order-2 ${
//                     isDark ? 'bg-gray-700' : 'bg-gray-200'
//                   }`}>
//                     <User className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
//                   </div>
//                 )}
//               </div>
//             ))}
            
//             {isTyping && (
//               <div className="flex items-start space-x-3">
//                 <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                   isDark ? 'bg-gradient-to-br from-red-500 to-red-600' : 'bg-gradient-to-br from-red-400 to-red-500'
//                 }`}>
//                   <Bot className="w-5 h-5 text-white" />
//                 </div>
//                 <div className={`px-4 py-3 rounded-2xl ${
//                   isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
//                 }`}>
//                   <div className="flex space-x-1">
//                     <div className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-gray-400' : 'bg-gray-500'}`} style={{animationDelay: '0ms'}}></div>
//                     <div className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-gray-400' : 'bg-gray-500'}`} style={{animationDelay: '150ms'}}></div>
//                     <div className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-gray-400' : 'bg-gray-500'}`} style={{animationDelay: '300ms'}}></div>
//                   </div>
//                 </div>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>
//         </div>

//         {/* Enhanced Floating Input Area */}
//         <div className={`transition-all duration-300 ${
//           isDark ? 'bg-gray-900' : 'bg-gray-50'
//         }`}>
//           <div className="max-w-4xl px-6 py-6 mx-auto">
//             {/* Floating container with 3D effect */}
//             <div className={`relative group ${
//               isDark 
//                 ? 'bg-gradient-to-br from-gray-800 to-gray-900 via-gray-850' 
//                 : 'bg-gradient-to-br from-white via-gray-50 to-gray-100'
//             } rounded-3xl p-4 transition-all duration-500 ease-out transform hover:scale-[1.02] hover:-translate-y-1 ${
//               isDark 
//                 ? 'shadow-[0_20px_60px_-12px_rgba(0,0,0,0.8),_0_8px_25px_-5px_rgba(0,0,0,0.4),_inset_0_1px_0_rgba(255,255,255,0.1)]' 
//                 : 'shadow-[0_20px_60px_-12px_rgba(0,0,0,0.25),_0_8px_25px_-5px_rgba(0,0,0,0.1),_inset_0_1px_0_rgba(255,255,255,0.8)]'
//             } ${
//               isDark ? 'border border-gray-700/50' : 'border border-gray-200/70'
//             }`}>
              
//               {/* Subtle glow effect */}
//               <div className={`absolute inset-0 rounded-3xl transition-opacity duration-500 ${
//                 isDark 
//                   ? 'bg-gradient-to-r via-transparent opacity-0 from-red-500/5 to-red-500/5 group-hover:opacity-100' 
//                   : 'bg-gradient-to-r via-transparent opacity-0 from-red-400/8 to-red-400/8 group-hover:opacity-100'
//               }`}></div>

//               {/* Input container */}
//               <div className="relative flex items-end space-x-3">
//                 {/* Text area with auto-height */}
//                 <div className="relative flex-1">
//                   <textarea
//                     value={inputText}
//                     onChange={(e) => {
//                       setInputText(e.target.value);
//                       // Auto-resize functionality
//                       const textarea = e.target;
//                       textarea.style.height = 'auto';
//                       textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
//                     }}
//                     onKeyPress={handleKeyPress}
//                     placeholder="Ask about maintenance procedures, technical documentation..."
//                     className={`w-full resize-none outline-none px-4 py-3 rounded-2xl min-h-[48px] max-h-[120px] transition-all duration-300 ${
//                       isDark 
//                         ? 'placeholder-gray-400 text-white border bg-gray-900/80 border-gray-700/50 focus:border-red-500/50 focus:bg-gray-900' 
//                         : 'placeholder-gray-500 text-gray-900 border bg-white/90 border-gray-300/50 focus:border-red-400/50 focus:bg-white'
//                     } backdrop-blur-sm focus:shadow-lg focus:ring-2 ${
//                       isDark ? 'focus:ring-red-500/20' : 'focus:ring-red-400/20'
//                     }`}
//                     rows="1"
//                     style={{ 
//                       height: 'auto',
//                       minHeight: '48px',
//                       lineHeight: '1.5'
//                     }}
//                     disabled={isTyping}
//                   />
                  
//                   {/* Character count indicator for longer messages */}
//                   {inputText.length > 100 && (
//                     <div className={`absolute -bottom-6 right-2 text-xs transition-colors duration-300 ${
//                       inputText.length > 200 
//                         ? 'text-orange-500' 
//                         : isDark ? 'text-gray-500' : 'text-gray-400'
//                     }`}>
//                       {inputText.length}/500
//                     </div>
//                   )}
//                 </div>

//                 {/* Action buttons */}
//                 <div className="flex items-center pb-1 space-x-2">
//                   {/* Send button */}
//                   <button
//                     onClick={handleSend}
//                     disabled={!inputText.trim() || isTyping}
//                     className={`relative p-3 rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
//                       inputText.trim() && !isTyping
//                         ? isDark
//                           ? 'bg-gradient-to-br from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40'
//                           : 'bg-gradient-to-br from-red-400 to-red-500 text-white hover:from-red-500 hover:to-red-600 shadow-lg shadow-red-400/30 hover:shadow-xl hover:shadow-red-400/40'
//                         : isDark
//                           ? 'bg-gray-700/60 text-gray-500 cursor-not-allowed opacity-50'
//                           : 'bg-gray-200/80 text-gray-400 cursor-not-allowed opacity-50'
//                     } backdrop-blur-sm border ${
//                       inputText.trim() && !isTyping
//                         ? 'border-transparent' 
//                         : isDark ? 'border-gray-600/30' : 'border-gray-300/30'
//                     }`}
//                   >
//                     {isTyping ? (
//                       <Loader className="w-5 h-5 animate-spin" />
//                     ) : (
//                       <Send className="w-5 h-5" />
//                     )}
                    
//                     {/* Send button glow effect */}
//                     {inputText.trim() && !isTyping && (
//                       <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
//                         isDark 
//                           ? 'bg-gradient-to-br from-red-400/20 to-red-600/20' 
//                           : 'bg-gradient-to-br from-red-300/20 to-red-500/20'
//                       } opacity-0 hover:opacity-100`}></div>
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Bottom gradient line */}
//               <div className={`absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r ${
//                 isDark 
//                   ? 'from-transparent to-transparent via-gray-600/50' 
//                   : 'from-transparent to-transparent via-gray-300/50'
//               }`}></div>
//             </div>

//             {/* Typing indicator hint */}
//             <div className={`mt-2 text-center text-xs transition-colors duration-300 ${
//               isDark ? 'text-gray-600' : 'text-gray-500'
//             }`}>
//               Press Enter to send • Shift + Enter for new line
//             </div>
//           </div>
//         </div>

//         {/* Enhanced Footer */}
//         <footer className={`px-6 py-3 text-center transition-all duration-300 ${
//           isDark ? 'text-gray-500 bg-gray-800 border-t border-gray-700' : 'text-gray-400 bg-white border-t border-gray-200'
//         }`}>
//           <p className="flex items-center justify-center gap-2 text-xs font-georamalight">
//             <span>Powered by</span>
//             <span className={`font-semibold ${isDark ? 'text-red-400' : 'text-red-500'}`}>
//               <img src={MAI_Logo} alt="" className='w-6'/>
//             </span>
//           </p>
//         </footer>

//         {/* Sidebar for document viewing */}
//         <Sidebar />

//         {/* Overlay for sidebar */}
//         {sidebarOpen && (
//           <div 
//             className="fixed inset-0 z-40 bg-black bg-opacity-50"
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}
//       </div>
//     );
// };

// export default ChatbotScreen;

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

  const handleSourceClick = async (source, pageNo) => {
    const imageData = await sourceAPI(source, pageNo, setLoadingImage);
    if (imageData) {
      setSelectedImage({
        source,
        pageNo,
        image: imageData
      });
      setSidebarOpen(true);
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