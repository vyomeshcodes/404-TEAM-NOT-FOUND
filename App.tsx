
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import AssessmentForm from './components/AssessmentForm';
import Dashboard from './components/Dashboard';
import { UserProfile, SkillGapAnalysis } from './types';
import { generatePersonalizedRoadmap } from './services/geminiService';

const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(localStorage.getItem('userEmail'));
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : null;
  });
  const [analysis, setAnalysis] = useState<SkillGapAnalysis | null>(() => {
    const saved = localStorage.getItem('analysis');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthSuccess = (email: string) => {
    setUser(email);
    localStorage.setItem('userEmail', email);
  };

  const handleLogout = () => {
    setUser(null);
    setProfile(null);
    setAnalysis(null);
    localStorage.clear();
  };

  const handleProfileSubmit = async (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem('userProfile', JSON.stringify(newProfile));
    
    setIsLoading(true);
    try {
      const result = await generatePersonalizedRoadmap(newProfile);
      setAnalysis(result);
      localStorage.setItem('analysis', JSON.stringify(result));
    } catch (error) {
      alert("Error generating roadmap: " + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Navbar onLogout={handleLogout} userEmail={user} />
      
      {!profile ? (
        <AssessmentForm onSubmit={handleProfileSubmit} />
      ) : (
        <Dashboard 
          profile={profile} 
          analysis={analysis} 
          isLoading={isLoading} 
        />
      )}

      {/* Persistent Call-To-Action (Floating) */}
      {profile && !isLoading && (
        <div className="fixed bottom-6 right-6 md:right-10 flex gap-3">
          <button 
            onClick={() => {
              if (confirm("Redo assessment? Your current roadmap will be reset.")) {
                setProfile(null);
                setAnalysis(null);
                localStorage.removeItem('userProfile');
                localStorage.removeItem('analysis');
              }
            }}
            className="bg-white text-slate-700 p-4 rounded-full shadow-lg border border-slate-200 hover:bg-slate-50 transition-all group"
          >
            <svg className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button 
            onClick={() => window.print()}
            className="bg-blue-600 text-white px-6 py-4 rounded-full shadow-lg hover:bg-blue-700 transition-all font-bold flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export Path
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
