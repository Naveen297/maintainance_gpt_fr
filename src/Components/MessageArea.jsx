// ChatbotScreen/MessageArea.js
import React from 'react';
import { Bot, User, Search } from 'lucide-react';
import SourceCard from './SourceCard';

const MessageArea = ({ messages, isTyping, isDark, handleSourceClick, messagesEndRef }) => {
  return (
    <div className="flex-1 px-4 py-6 overflow-y-auto font-georamalight">
      <div className="max-w-4xl mx-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.sender === 'bot' && (
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                isDark ? 'bg-gradient-to-br from-red-500 to-red-600' : 'bg-gradient-to-br from-red-400 to-red-500'
              }`}>
                <Bot className="w-5 h-5 text-white" />
              </div>
            )}
            
            <div className={`group relative max-w-md ${message.sender === 'user' ? 'order-1' : ''}`}>
              <div className={`px-4 py-3 rounded-2xl transition-all duration-300 ${
                message.sender === 'user'
                  ? isDark 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' 
                    : 'bg-gradient-to-r from-red-400 to-red-500 text-white'
                  : isDark
                    ? 'bg-gray-800 text-gray-100 border border-gray-700'
                    : 'bg-white text-gray-800 border border-gray-200'
              }`}>
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
              
              {/* Sources section for bot messages */}
              {message.sender === 'bot' && message.sources && message.sources.length > 0 && (
                <div className="mt-3 space-y-2">
                  <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Search className="inline w-3 h-3 mr-1" />
                    Sources found ({message.sources.length})
                  </div>
                  {message.sources.map((source, index) => (
                    <SourceCard
                      key={index}
                      source={source.source}
                      pageNo={source.pageNo}
                      text={source.text}
                      score={source.score}
                      onClick={handleSourceClick}
                      isDark={isDark}
                    />
                  ))}
                </div>
              )}
              
              <p className={`text-xs mt-1 transition-colors duration-300 ${
                message.sender === 'user' ? 'text-right' : 'text-left'
              } ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {message.timestamp}
              </p>
            </div>

            {message.sender === 'user' && (
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 order-2 ${
                isDark ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                <User className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isDark ? 'bg-gradient-to-br from-red-500 to-red-600' : 'bg-gradient-to-br from-red-400 to-red-500'
            }`}>
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className={`px-4 py-3 rounded-2xl ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            }`}>
              <div className="flex space-x-1">
                <div className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-gray-400' : 'bg-gray-500'}`} style={{animationDelay: '0ms'}}></div>
                <div className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-gray-400' : 'bg-gray-500'}`} style={{animationDelay: '150ms'}}></div>
                <div className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-gray-400' : 'bg-gray-500'}`} style={{animationDelay: '300ms'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageArea;
