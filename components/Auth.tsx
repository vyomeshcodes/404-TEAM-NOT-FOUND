
import React, { useState } from 'react';

interface AuthProps {
  onAuthSuccess: (email: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsAuthenticating(true);
      // Simulate network request
      setTimeout(() => {
        setIsAuthenticating(false);
        onAuthSuccess(email);
      }, 1200);
    } else {
      alert('Please fill in both email and password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 -left-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 -right-10 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg mb-6">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            {isLogin ? 'Welcome Back' : 'Get Started'}
          </h2>
          <p className="mt-3 text-slate-500 font-medium">
            Planify your career with AI intelligence.
          </p>
        </div>

        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Email Address</label>
              <input
                type="email"
                required
                disabled={isAuthenticating}
                className="block w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white transition-all outline-none font-medium"
                placeholder="alex@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Password</label>
              <input
                type="password"
                required
                disabled={isAuthenticating}
                className="block w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white transition-all outline-none font-medium"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <div className="flex items-center">
              <input id="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-500 font-medium">Remember me</label>
            </div>
            {isLogin && (
              <a href="#" className="text-sm font-bold text-blue-600 hover:text-blue-500">Forgot password?</a>
            )}
          </div>

          <button
            type="submit"
            disabled={isAuthenticating}
            className="w-full flex justify-center py-5 px-4 rounded-2xl shadow-xl text-lg font-black text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isAuthenticating ? (
              <div className="flex items-center gap-3">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isLogin ? 'Signing In...' : 'Registering...'}
              </div>
            ) : (
              isLogin ? 'Sign In to Planify' : 'Create My Account'
            )}
          </button>
        </form>

        <div className="text-center pt-4">
          <button
            onClick={() => setIsLogin(!isLogin)}
            disabled={isAuthenticating}
            className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
          >
            {isLogin ? "New to Planify? " : 'Already have an account? '}
            <span className="text-blue-600">{isLogin ? 'Sign up for free' : 'Log in here'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
