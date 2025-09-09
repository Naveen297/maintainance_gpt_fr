// ChatbotScreen/InputArea.js
import React from 'react';
import { Send, Loader } from 'lucide-react';

const InputArea = ({ inputText, setInputText, handleSend, handleKeyPress, isTyping, isDark }) => {
  return (
    <div className={`transition-all duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl px-6 py-6 mx-auto">
        {/* Floating container with 3D effect */}
        <div className={`relative group ${
          isDark 
            ? 'bg-gradient-to-br from-gray-800 to-gray-900 via-gray-850' 
            : 'bg-gradient-to-br from-white via-gray-50 to-gray-100'
        } rounded-3xl p-4 transition-all duration-500 ease-out transform hover:scale-[1.02] hover:-translate-y-1 ${
          isDark 
            ? 'shadow-[0_20px_60px_-12px_rgba(0,0,0,0.8),_0_8px_25px_-5px_rgba(0,0,0,0.4),_inset_0_1px_0_rgba(255,255,255,0.1)]' 
            : 'shadow-[0_20px_60px_-12px_rgba(0,0,0,0.25),_0_8px_25px_-5px_rgba(0,0,0,0.1),_inset_0_1px_0_rgba(255,255,255,0.8)]'
        } ${
          isDark ? 'border border-gray-700/50' : 'border border-gray-200/70'
        }`}>
          
          {/* Subtle glow effect */}
          <div className={`absolute inset-0 rounded-3xl transition-opacity duration-500 ${
            isDark 
              ? 'bg-gradient-to-r via-transparent opacity-0 from-red-500/5 to-red-500/5 group-hover:opacity-100' 
              : 'bg-gradient-to-r via-transparent opacity-0 from-red-400/8 to-red-400/8 group-hover:opacity-100'
          }`}></div>

          {/* Input container */}
          <div className="relative flex items-end space-x-3">
            {/* Text area with auto-height */}
            <div className="relative flex-1">
              <textarea
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  // Auto-resize functionality
                  const textarea = e.target;
                  textarea.style.height = 'auto';
                  textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
                }}
                onKeyPress={handleKeyPress}
                placeholder="Ask about maintenance procedures, technical documentation..."
                className={`w-full resize-none outline-none px-4 py-3 rounded-2xl min-h-[48px] max-h-[120px] transition-all duration-300 ${
                  isDark 
                    ? 'placeholder-gray-400 text-white border bg-gray-900/80 border-gray-700/50 focus:border-red-500/50 focus:bg-gray-900' 
                    : 'placeholder-gray-500 text-gray-900 border bg-white/90 border-gray-300/50 focus:border-red-400/50 focus:bg-white'
                } backdrop-blur-sm focus:shadow-lg focus:ring-2 ${
                  isDark ? 'focus:ring-red-500/20' : 'focus:ring-red-400/20'
                }`}
                rows="1"
                style={{ 
                  height: 'auto',
                  minHeight: '48px',
                  lineHeight: '1.5'
                }}
                disabled={isTyping}
              />
              
              {/* Character count indicator for longer messages */}
              {inputText.length > 100 && (
                <div className={`absolute -bottom-6 right-2 text-xs transition-colors duration-300 ${
                  inputText.length > 200 
                    ? 'text-orange-500' 
                    : isDark ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {inputText.length}/500
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex items-center pb-1 space-x-2">
              {/* Send button */}
              <button
                onClick={handleSend}
                disabled={!inputText.trim() || isTyping}
                className={`relative p-3 rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                  inputText.trim() && !isTyping
                    ? isDark
                      ? 'bg-gradient-to-br from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40'
                      : 'bg-gradient-to-br from-red-400 to-red-500 text-white hover:from-red-500 hover:to-red-600 shadow-lg shadow-red-400/30 hover:shadow-xl hover:shadow-red-400/40'
                    : isDark
                      ? 'bg-gray-700/60 text-gray-500 cursor-not-allowed opacity-50'
                      : 'bg-gray-200/80 text-gray-400 cursor-not-allowed opacity-50'
                } backdrop-blur-sm border ${
                  inputText.trim() && !isTyping
                    ? 'border-transparent' 
                    : isDark ? 'border-gray-600/30' : 'border-gray-300/30'
                }`}
              >
                {isTyping ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                
                {/* Send button glow effect */}
                {inputText.trim() && !isTyping && (
                  <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
                    isDark 
                      ? 'bg-gradient-to-br from-red-400/20 to-red-600/20' 
                      : 'bg-gradient-to-br from-red-300/20 to-red-500/20'
                  } opacity-0 hover:opacity-100`}></div>
                )}
              </button>
            </div>
          </div>

          {/* Bottom gradient line */}
          <div className={`absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r ${
            isDark 
              ? 'from-transparent to-transparent via-gray-600/50' 
              : 'from-transparent to-transparent via-gray-300/50'
          }`}></div>
        </div>

        {/* Typing indicator hint */}
        <div className={`mt-2 text-center text-xs transition-colors duration-300 ${
          isDark ? 'text-gray-600' : 'text-gray-500'
        }`}>
          Press Enter to send • Shift + Enter for new line
        </div>
      </div>
    </div>
  );
};

export default InputArea;