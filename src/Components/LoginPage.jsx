import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, Wrench, Settings, Cog, Zap, Shield, Monitor, Database } from 'lucide-react';
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

  const FloatingIcon = ({ icon: Icon, className = "", delay = 0, size = "w-5 h-5" }) => (
    <div 
      className={`absolute opacity-20 ${className}`}
      style={{ 
        animation: `float 6s ease-in-out infinite`,
        animationDelay: `${delay}s`
      }}
    >
      <Icon className={`${size} text-red-400/30`} />
    </div>
  );

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900 font-georama">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large gradient orbs */}
        <div className="absolute rounded-full -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-600/10 via-red-500/5 to-transparent blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute rounded-full -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-red-700/8 via-red-600/4 to-transparent blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>
        <div className="absolute w-64 h-64 rounded-full top-1/3 left-1/4 bg-gradient-to-r from-red-500/5 to-red-400/5 blur-2xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '4s' }}></div>
        
        {/* Geometric elements */}
        <div className="absolute w-32 h-32 border rounded-full top-20 right-32 border-red-500/10 animate-spin" style={{ animationDuration: '30s' }}></div>
        <div className="absolute w-24 h-24 rotate-45 border rounded-lg bottom-32 left-20 border-red-400/8 animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute w-16 h-16 rounded-full top-1/2 right-20 bg-gradient-to-br from-red-500/5 to-transparent animate-ping" style={{ animationDuration: '5s' }}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(239, 68, 68, 0.2) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Enhanced floating icons */}
      <FloatingIcon icon={Shield} className="top-24 left-16" delay={0} size="w-6 h-6" />
      <FloatingIcon icon={Monitor} className="top-32 right-24" delay={1.5} size="w-5 h-5" />
      <FloatingIcon icon={Database} className="bottom-40 left-24" delay={3} size="w-4 h-4" />
      <FloatingIcon icon={Wrench} className="top-40 left-1/3" delay={0.5} size="w-5 h-5" />
      <FloatingIcon icon={Settings} className="bottom-32 right-32" delay={2.5} size="w-6 h-6" />
      <FloatingIcon icon={Cog} className="top-1/2 left-12" delay={4} size="w-4 h-4" />
      <FloatingIcon icon={Zap} className="bottom-24 right-16" delay={1} size="w-5 h-5" />
      <FloatingIcon icon={Sparkles} className="top-1/3 right-1/3" delay={3.5} size="w-4 h-4" />

      {/* Main Login Container */}
      <div className={`relative z-10 w-full max-w-md transform transition-all duration-1000 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        {/* Enhanced glassmorphism card */}
        <div className="relative p-8 overflow-hidden border shadow-2xl rounded-3xl backdrop-blur-xl bg-slate-900/40 border-slate-700/50">
          {/* Inner glow effect */}
          <div className="absolute inset-[1px] bg-gradient-to-b from-slate-800/20 to-slate-900/20 rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-red-600/5 rounded-3xl"></div>
          
          {/* Enhanced header */}
          <div className="relative z-10 mb-8 text-center">
            {/* Redesigned logo */}
            <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6 transition-all duration-500 transform group">
              {/* Outer ring */}
              <div className="absolute inset-0 transition-all duration-500 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/20 group-hover:from-red-500/30 group-hover:to-red-600/30"></div>
              {/* Inner container */}
              <div className="relative w-20 h-20 transition-all duration-500 shadow-lg bg-gradient-to-br from-red-500 to-red-600 rounded-xl group-hover:shadow-red-500/25 group-hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-red-400/50 to-red-700/50 rounded-xl animate-pulse"></div>
                <div className="relative z-10 flex items-center justify-center w-full h-full">
                  <Cog className="w-10 h-10 text-white animate-spin" style={{ animationDuration: '8s' }} />
                </div>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 transition-all duration-500 rounded-2xl bg-gradient-to-br from-red-500/10 to-red-600/10 blur-md group-hover:blur-lg"></div>
            </div>

            {/* Enhanced title */}
            <div className="mb-6">
              <h1 className="mb-2 text-4xl font-bold tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600">
                  MAINTENANCE
                </span>
              </h1>
              <h2 className="mb-3 text-3xl font-bold tracking-wider text-white/95">GPT</h2>
              <div className="w-16 h-[2px] mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                Advanced AI-powered maintenance assistant
                <br />
                <span className="text-xs text-slate-500">Secure • Intelligent • Reliable</span>
              </p>
            </div>
          </div>

          {/* Enhanced demo credentials box */}
          {/* <div className="relative z-10 p-4 mb-6 border rounded-xl bg-slate-800/30 border-slate-700/50">
            <div className="flex items-center mb-2 space-x-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-xs font-medium text-green-400">Demo Credentials</span>
            </div>
            <div className="space-y-1 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Email:</span>
                <span className="font-mono">admin@mahindra.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Password:</span>
                <span className="font-mono">admin</span>
              </div>
            </div>
          </div> */}

          {/* Enhanced error message */}
          {error && (
            <div className="relative z-10 p-4 mb-6 border rounded-xl bg-red-500/10 border-red-500/20 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <p className="text-sm text-red-300">{error}</p>
              </div>
            </div>
          )}

          {/* Enhanced login form */}
          <div className="relative z-10 space-y-5">
            {/* Enhanced email input */}
            <div className="relative group">
              <div className={`relative rounded-xl border transition-all duration-300 ${
                focusedInput === 'email' 
                  ? 'border-red-500/50 bg-slate-800/60 shadow-lg shadow-red-500/10' 
                  : 'border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/40 hover:border-slate-600/50'
              }`}>
                <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
                  focusedInput === 'email' ? 'text-red-400' : 'text-slate-400'
                }`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput('')}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your email address"
                  className="w-full py-4 pl-12 pr-4 text-sm text-white bg-transparent border-0 outline-none placeholder-slate-400"
                />
                {focusedInput === 'email' && (
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-r rounded-xl from-red-500/5 to-red-600/5"></div>
                )}
              </div>
            </div>

            {/* Enhanced password input */}
            <div className="relative group">
              <div className={`relative rounded-xl border transition-all duration-300 ${
                focusedInput === 'password' 
                  ? 'border-red-500/50 bg-slate-800/60 shadow-lg shadow-red-500/10' 
                  : 'border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/40 hover:border-slate-600/50'
              }`}>
                <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
                  focusedInput === 'password' ? 'text-red-400' : 'text-slate-400'
                }`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput('')}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your password"
                  className="w-full py-4 pl-12 pr-12 text-sm text-white bg-transparent border-0 outline-none placeholder-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute transition-all duration-300 transform -translate-y-1/2 right-4 top-1/2 text-slate-400 hover:text-white hover:scale-110"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                {focusedInput === 'password' && (
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-r rounded-xl from-red-500/5 to-red-600/5"></div>
                )}
              </div>
            </div>

            {/* Enhanced login button */}
            <button
              onClick={handleLogin}
              disabled={isLoading || !email.trim() || !password.trim()}
              className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group ${
                isLoading || !email.trim() || !password.trim()
                  ? 'bg-slate-700 cursor-not-allowed border border-slate-600'
                  : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-red-500/25 border border-red-500/50'
              }`}
            >
              {/* Enhanced button glow effect */}
              {!isLoading && email.trim() && password.trim() && (
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r rounded-xl from-red-400/20 to-red-600/20 group-hover:opacity-100"></div>
              )}
              
              <div className="relative z-10 flex items-center justify-center space-x-2">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 rounded-full animate-spin border-white/30 border-t-white"></div>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </div>
            </button>
          </div>

          {/* Security badge */}
          <div className="relative z-10 flex items-center justify-center mt-6 space-x-2 text-xs text-slate-500">
            <Shield className="w-3 h-3" />
            <span>End-to-end encrypted connection</span>
          </div>
        </div>

        {/* Enhanced bottom branding */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-xs text-slate-500">
            <span className='flex items-center'>Powered by 
              <img src={MAI_Logo} alt="MAI Logo" className='h-3 ml-2 opacity-60'/>
            </span>
          </div>
         
        </div>

        {/* Enhanced decorative elements */}
        <div className="absolute w-16 h-16 rounded-full -top-8 -right-8 opacity-10 animate-ping bg-red-500/20" style={{ animationDuration: '4s' }}></div>
        <div className="absolute w-12 h-12 rounded-full -bottom-6 -left-6 animate-pulse bg-red-400/10" style={{ animationDuration: '3s' }}></div>
      </div>

      {/* Custom CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          25% { 
            transform: translateY(-10px) rotate(90deg); 
          }
          50% { 
            transform: translateY(-5px) rotate(180deg); 
          }
          75% { 
            transform: translateY(-15px) rotate(270deg); 
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;