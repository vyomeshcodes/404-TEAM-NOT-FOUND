
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import LandingPage from './components/LandingPage';
import AssessmentForm from './components/AssessmentForm';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import { UserProfile, SkillGapAnalysis } from './types';
import { generatePersonalizedRoadmap } from './services/geminiService';
import { db } from './services/dbService';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'auth' | 'assessment' | 'dashboard'>('landing');
  const [user, setUser] = useState<string | null>(localStorage.getItem('planify_current_session'));
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [analysis, setAnalysis] = useState<SkillGapAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Restore theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    if (user) {
      const account = db.getCurrentUser();
      if (account) {
        if (account.profile) {
          setProfile(account.profile);
          setAnalysis(account.analysis || null);
          setView('dashboard');
        } else {
          setView('assessment');
        }
      }
    } else {
      setView('landing');
    }
  }, [user]);

  const handleLogout = () => {
    db.logout();
    setUser(null);
    setProfile(null);
    setAnalysis(null);
    setView('landing');
  };

  const handleProfileSubmit = async (newProfile: UserProfile) => {
    setProfile(newProfile);
    setIsLoading(true);
    setView('dashboard');
    try {
      const result = await generatePersonalizedRoadmap(newProfile);
      setAnalysis(result);
      if (user) db.updateProfile(user, newProfile, result);
    } catch (e) {
      alert("AI roadmap failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <Navbar 
        userEmail={user || undefined} 
        onLogout={handleLogout} 
        onOpenSettings={() => setShowSettings(true)} 
      />
      
      {showSettings && user && (
        <Settings 
          email={user} 
          onClose={() => setShowSettings(false)} 
          onUpdate={(newEmail) => setUser(newEmail)} 
        />
      )}

      <main>
        {view === 'landing' && <LandingPage onStart={() => setView('auth')} />}
        {view === 'auth' && <Auth onAuthSuccess={(email) => setUser(email)} />}
        {view === 'assessment' && <AssessmentForm onSubmit={handleProfileSubmit} />}
        {view === 'dashboard' && profile && (
          <Dashboard 
            profile={profile} 
            analysis={analysis} 
            isLoading={isLoading} 
          />
        )}
      </main>
    </div>
  );
};

export default App;
