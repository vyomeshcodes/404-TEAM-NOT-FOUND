
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20 dark:opacity-40">
          <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-black mb-10 animate-bounce">
            <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
            <span>NEXT-GEN SKILL INTELLIGENCE</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            Architect Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Future Career.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-slate-500 dark:text-slate-400 font-medium mb-12">
            The intelligent mentor for students in emerging sectors. 
            AI-driven roadmaps, real-time skill gap analysis, and curated learning paths.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={onStart}
              className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-[2rem] text-xl font-black shadow-2xl shadow-blue-500/30 transition-all transform hover:-translate-y-1 active:scale-95"
            >
              Get Started for Free
            </button>
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-900 bg-slate-200 overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} alt="User" />
                </div>
              ))}
              <div className="flex items-center ml-4 text-sm font-bold text-slate-500">
                Join 10k+ users
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "AI Skill Analysis", desc: "Instantly discover what you're missing for your dream job.", icon: "🎯" },
              { title: "Dynamic Roadmaps", desc: "4-week intensive paths tailored to your daily availability.", icon: "🗺️" },
              { title: "Curated Content", desc: "The best videos and projects from across the web, chosen by AI.", icon: "📚" }
            ].map((f, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 hover:scale-105 transition-transform">
                <div className="text-4xl mb-6">{f.icon}</div>
                <h3 className="text-2xl font-black mb-4 dark:text-white">{f.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
