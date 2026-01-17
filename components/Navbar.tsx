
import React from 'react';

interface NavbarProps {
  onLogout: () => void;
  onOpenSettings: () => void;
  userEmail?: string;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout, onOpenSettings, userEmail }) => {
  const [isDark, setIsDark] = React.useState(document.documentElement.classList.contains('dark'));

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => window.location.reload()}>
            <div className="bg-blue-600 p-2.5 rounded-2xl shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">PLANIFY</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <button 
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
            >
              {isDark ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.243 17.657l-.707-.707M6.343 6.364l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>

            {userEmail && (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={onOpenSettings}
                  className="flex items-center space-x-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <span className="hidden sm:inline">Settings</span>
                </button>
                <button
                  onClick={onLogout}
                  className="px-5 py-2.5 rounded-xl text-sm font-black text-white bg-red-500 hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 active:scale-95"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
