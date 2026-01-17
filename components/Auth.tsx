
import React, { useState } from 'react';
import { db } from '../services/dbService';

interface AuthProps {
  onAuthSuccess: (email: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Required fields missing');
      return;
    }

    setIsAuthenticating(true);
    
    // Simulate network delay
    setTimeout(() => {
      if (isLogin) {
        if (db.login(email, password)) {
          onAuthSuccess(email);
        } else {
          setError('Invalid email or password');
          setIsAuthenticating(false);
        }
      } else {
        if (db.signup(email, password)) {
          onAuthSuccess(email);
        } else {
          setError('User already exists');
          setIsAuthenticating(false);
        }
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-100/40 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-indigo-100/40 rounded-full blur-[120px]"></div>

      <div className="max-w-md w-full space-y-8 bg-white/70 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-white/50 relative z-10 transition-all duration-500">
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-5 bg-gradient-to-tr from-blue-600 to-indigo-700 rounded-3xl shadow-xl shadow-blue-200 mb-8 transform hover:scale-110 transition-transform">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
            {isLogin ? 'Welcome Back' : 'Join Planify'}
          </h2>
          <p className="text-slate-500 font-medium">
            AI-Driven Career Intelligence for Modern Sectors
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100 animate-shake">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="group">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Email Address</label>
              <input
                type="email"
                required
                disabled={isAuthenticating}
                className="block w-full px-6 py-4 bg-slate-50/50 border border-slate-200/60 rounded-[1.25rem] focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white transition-all outline-none font-medium placeholder:text-slate-300"
                placeholder="alex@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="group">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Secure Password</label>
              <input
                type="password"
                required
                disabled={isAuthenticating}
                className="block w-full px-6 py-4 bg-slate-50/50 border border-slate-200/60 rounded-[1.25rem] focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white transition-all outline-none font-medium placeholder:text-slate-300"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isAuthenticating}
            className="w-full flex justify-center py-5 px-6 rounded-[1.25rem] shadow-xl shadow-blue-100 text-lg font-black text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all transform active:scale-[0.97] disabled:opacity-70"
          >
            {isAuthenticating ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              isLogin ? 'Sign In to Dashboard' : 'Create My Account'
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            disabled={isAuthenticating}
            className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors py-2"
          >
            {isLogin ? "Don't have an account? " : 'Already a member? '}
            <span className="text-blue-600 underline underline-offset-4">{isLogin ? 'Sign up free' : 'Log in here'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
