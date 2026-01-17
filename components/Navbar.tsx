
import React from 'react';

interface NavbarProps {
  onLogout: () => void;
  userEmail?: string;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout, userEmail }) => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span className="text-xl font-bold text-slate-900">PLANIFY</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {userEmail && (
              <span className="text-sm text-slate-500 hidden md:block">
                Welcome, <span className="font-medium text-slate-700">{userEmail}</span>
              </span>
            )}
            <button
              onClick={onLogout}
              className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
