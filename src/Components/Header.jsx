// ChatbotScreen/Header.js
import React from 'react';
import { Sun, Moon, Settings, User, ChevronDown } from 'lucide-react';

const Header = ({ isDark, toggleTheme, showUserMenu, setShowUserMenu, onLogout }) => {
  return (
    <header className={`relative flex items-center justify-between px-8 py-4 border-b transition-all duration-300 ${
      isDark ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-r from-white via-gray-50 to-white border-gray-200'
    }`}>
      {/* Left side - Logo and branding */}
      <div className="flex items-center space-x-4">
        <div className={`relative p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
          isDark ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/25' : 'bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/20'
        }`}>
          <div className="absolute inset-0 rounded-xl bg-white/20"></div>
          <svg className="relative z-10 text-white w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
          </svg>
        </div>
        
        <div className="flex flex-col font-georama">
          <div className={`text-2xl font-bold tracking-tight ${
            isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300' : 'text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600'
          }`}>
            MaintenanceAI
          </div>
          <div className={`text-xs font-medium tracking-wider uppercase ${
            isDark ? 'text-red-400' : 'text-red-500'
          }`}>
            Intelligent Operations Platform
          </div>
        </div>
      </div>

      {/* Right side - Controls */}
      <div className="flex items-center space-x-3">
        {/* Settings */}
        <button className={`p-2.5 rounded-lg transition-all duration-200 hover:scale-105 ${
          isDark ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white' : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/80 hover:text-gray-800'
        }`}>
          <Settings className="w-5 h-5" />
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className={`p-2.5 rounded-lg transition-all duration-200 hover:scale-105 ${
            isDark ? 'bg-gray-700/50 text-yellow-400 hover:bg-gray-600/50' : 'bg-gray-100/80 text-orange-500 hover:bg-gray-200/80'
          }`}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* User menu */}
        <div className="relative">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
              isDark ? 'text-gray-300 bg-gray-700/50 hover:bg-gray-600/50' : 'text-gray-600 bg-gray-100/80 hover:bg-gray-200/80'
            }`}
          >
            <div className={`flex justify-center items-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full`}>
              <User className="w-4 h-4 text-white" />
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
          </button>

          {/* User dropdown */}
          {showUserMenu && (
            <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl border transition-all duration-200 z-50 font-georama ${
              isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="py-2">
                <div className={`px-4 py-2 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>Admin</div>
                </div>
                <button className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700'}`}>
                  Profile Settings
                </button>
                <button className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700'}`}>
                  Preferences
                </button>
                <hr className={`my-2 ${isDark ? 'border-gray-700' : 'border-gray-200'}`} />
                <button 
                  onClick={onLogout}
                  className={`w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50 ${isDark ? 'hover:bg-red-900/20' : ''}`}
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;