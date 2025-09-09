import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, Wrench, Settings, Cog, Zap, Send, Moon, Sun, Mic, StopCircle, MoreVertical, User, Bot } from 'lucide-react';
import MAI_Logo from '../assets/MAI_Logo.png';
// Login Page Component
const LoginPage = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState('');
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = () => {
    setError('');
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      
      // Check credentials
      if (email === 'admin@mahindra.com' && password === 'admin') {
        onLogin();
      } else {
        setError('Invalid email or password. Please try again.');
      }
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const FloatingIcon = ({ icon: Icon, className = "", delay = 0 }) => (
    <div 
      className={`absolute animate-bounce ${className}`}
      style={{ 
        animationDelay: `${delay}s`,
        animationDuration: '3s',
        animationIterationCount: 'infinite'
      }}
    >
      <Icon className="w-6 h-6 text-red-500/20" />
    </div>
  );

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-900 via-red-900/20 font-georama">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute rounded-full -top-4 -left-4 w-72 h-72 mix-blend-multiply filter blur-xl animate-pulse bg-red-500/10"></div>
        <div className="absolute rounded-full -right-4 -bottom-8 w-72 h-72 mix-blend-multiply filter blur-xl animate-pulse bg-red-600/10" style={{ animationDelay: '2s' }}></div>
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 w-96 h-96 mix-blend-multiply filter blur-2xl animate-pulse bg-red-400/5" style={{ animationDelay: '4s' }}></div>
        
        {/* Geometric shapes */}
        <div className="absolute w-32 h-32 border rounded-full top-20 right-20 animate-spin border-red-500/10" style={{ animationDuration: '20s' }}></div>
        <div className="absolute w-24 h-24 rotate-45 border rounded-lg left-16 bottom-32 animate-pulse border-red-400/10"></div>
        <div className="absolute w-16 h-16 rounded-full top-1/3 right-1/4 bg-gradient-to-r to-transparent animate-ping from-red-500/5" style={{ animationDuration: '4s' }}></div>
      </div>

      {/* Floating Icons */}
      <FloatingIcon icon={Wrench} className="left-10 top-20" delay={0} />
      <FloatingIcon icon={Settings} className="right-20 top-32" delay={1} />
      <FloatingIcon icon={Cog} className="left-20 bottom-40" delay={2} />
      <FloatingIcon icon={Zap} className="right-10 bottom-20" delay={0.5} />
      <FloatingIcon icon={Sparkles} className="top-40 left-1/2" delay={1.5} />

      {/* Main Login Container */}
      <div className={`relative z-10 w-full max-w-md transform transition-all duration-1000 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        {/* Glassmorphism Card */}
        <div className="relative p-8 overflow-hidden border shadow-2xl rounded-3xl backdrop-blur-xl bg-white/10 border-white/20">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r rounded-3xl from-red-500/5 to-red-600/5"></div>
          
          {/* Header */}
          <div className="relative z-10 mb-8 text-center">
            {/* Logo */}
            <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6 transition-all duration-300 transform shadow-lg bg-gradient-to-br from-red-500 to-red-600 rounded-2xl hover:scale-105">
              <div className="absolute inset-0 opacity-50 bg-gradient-to-br from-red-400 to-red-700 rounded-2xl animate-pulse"></div>
              <svg className="relative z-10 w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
              </svg>
            </div>

            {/* Title with animated gradient */}
            <h1 className="mb-2 text-4xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600 animate-pulse">
                MAINTENANCE
              </span>
            </h1>
            <h2 className="mb-3 text-3xl font-bold tracking-wide text-white/90">GPT</h2>
            <p className="text-sm text-white/70">Your AI-powered maintenance assistant</p>
          </div>

          {/* Demo Credentials */}


          {/* Error Message */}
          {error && (
            <div className="relative z-10 p-3 mb-6 border rounded-lg bg-red-500/20 border-red-500/30">
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <div className="relative z-10 space-y-6">
            {/* Email Input */}
            <div className="relative group">
              <div className={`relative rounded-xl transition-all duration-300 ${
                focusedInput === 'email' 
                  ? 'ring-2 ring-red-500/50 bg-white/20 scale-[1.02]' 
                  : 'bg-white/10 hover:bg-white/15 group-hover:scale-[1.01]'
              }`}>
                <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
                  focusedInput === 'email' ? 'text-red-400 scale-110' : 'text-white/60'
                }`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput('')}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your email"
                  className="w-full py-4 pl-12 pr-4 text-lg text-white bg-transparent border-0 outline-none placeholder-white/50"
                />
                {focusedInput === 'email' && (
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-r rounded-xl from-red-500/10 to-red-600/10"></div>
                )}
              </div>
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className={`relative rounded-xl transition-all duration-300 ${
                focusedInput === 'password' 
                  ? 'ring-2 ring-red-500/50 bg-white/20 scale-[1.02]' 
                  : 'bg-white/10 hover:bg-white/15 group-hover:scale-[1.01]'
              }`}>
                <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
                  focusedInput === 'password' ? 'text-red-400 scale-110' : 'text-white/60'
                }`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput('')}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your password"
                  className="w-full py-4 pl-12 pr-12 text-lg text-white bg-transparent border-0 outline-none placeholder-white/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute transition-all duration-300 transform -translate-y-1/2 right-4 top-1/2 text-white/60 hover:text-white hover:scale-110"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                {focusedInput === 'password' && (
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-r rounded-xl from-red-500/10 to-red-600/10"></div>
                )}
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            {/* <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 transition-colors duration-300 cursor-pointer text-white/70 hover:text-white group">
                <div className="relative">
                  <input type="checkbox" className="sr-only" />
                  <div className="w-5 h-5 transition-all duration-300 border rounded bg-white/10 border-white/30 group-hover:bg-white/20 group-hover:border-red-400"></div>
                  <svg className="absolute w-3 h-3 text-red-400 transition-opacity duration-300 transform -translate-x-1/2 -translate-y-1/2 opacity-0 top-1/2 left-1/2 group-hover:opacity-100" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Remember me</span>  
              </label>
              <button className="text-red-400 transition-colors duration-300 hover:text-red-300 hover:underline">
                Forgot password?
              </button>
            </div> */}

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading || !email.trim() || !password.trim()}
              className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden ${
                isLoading || !email.trim() || !password.trim()
                  ? 'bg-gradient-to-r from-gray-500 to-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-red-500/25'
              }`}
            >
              {/* Button background glow effect */}
              {!isLoading && email.trim() && password.trim() && (
                <div className="absolute inset-0 transition-opacity duration-300 opacity-75 bg-gradient-to-r rounded-xl blur from-red-400/50 to-red-600/50 group-hover:opacity-100"></div>
              )}
              
              <div className="relative z-10">
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 rounded-full animate-spin border-white/30 border-t-white"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Branding */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-xs text-white/40">
            <span className='flex'>Powered by 
              <img src={MAI_Logo} alt="" className='h-3 ml-2'/>
            </span>
          </div>
        </div>

        <div className="absolute w-12 h-12 rounded-full -top-6 -right-6 opacity-20 animate-ping bg-red-500/10"></div>
        <div className="absolute w-8 h-8 rounded-full -bottom-4 -left-4 animate-pulse bg-red-400/10"></div>
      </div>

      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ef4444' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
    </div>
  );
};

export default LoginPage;
    