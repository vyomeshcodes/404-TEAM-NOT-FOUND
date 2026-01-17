
import React from 'react';
import { UserProfile, SkillGapAnalysis } from '../types';
import RoadmapView from './RoadmapView';

interface DashboardProps {
  profile: UserProfile;
  analysis: SkillGapAnalysis | null;
  isLoading: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ profile, analysis, isLoading }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      {/* Header / Summary Section */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex flex-col lg:flex-row justify-between items-stretch gap-10">
        <div className="flex items-center gap-8 flex-1">
          <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center text-white text-4xl font-black shadow-lg shadow-blue-100">
            {profile.name.charAt(0).toUpperCase()}
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-slate-900">{profile.name}'s Roadmap</h1>
            <p className="text-slate-500 font-medium leading-relaxed max-w-xl">
              Targeting: <span className="text-blue-600 font-bold">{profile.sector}</span>
              <br />
              Goal: <span className="text-slate-800 italic">"{profile.goal}"</span>
            </p>
          </div>
        </div>

        {/* Visual Graph / Progress Comparison */}
        <div className="lg:w-96 flex flex-col justify-center space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Readiness vs. Baseline</h3>
          
          <div className="space-y-4">
            {/* User Progress */}
            <div className="space-y-1">
              <div className="flex justify-between items-end">
                <span className="text-sm font-bold text-slate-700">Your Current Level</span>
                <span className="text-lg font-black text-blue-600">{analysis?.readinessScore || 0}%</span>
              </div>
              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${analysis?.readinessScore || 0}%` }}
                ></div>
              </div>
            </div>

            {/* Baseline Comparison */}
            <div className="space-y-1">
              <div className="flex justify-between items-end">
                <span className="text-sm font-bold text-slate-400">Baseline (No Start)</span>
                <span className="text-sm font-black text-slate-400">{analysis?.baselineScore || 5}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden opacity-50">
                <div 
                  className="h-full bg-slate-400 rounded-full"
                  style={{ width: `${analysis?.baselineScore || 5}%` }}
                ></div>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 text-center font-medium">
            Based on AI evaluation of your expertise in {profile.sector} relative to your specific career goal.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Side Panels */}
        <div className="lg:col-span-1 space-y-10">
          {/* Recommendation Block */}
          {analysis && (
            <section className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-8 shadow-2xl shadow-blue-200 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white/20 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black">Career Insight</h3>
              </div>
              <p className="text-white/90 leading-relaxed font-medium mb-8 italic">
                "{analysis.recommendation}"
              </p>
              
              <div className="space-y-4">
                <p className="text-xs uppercase font-black tracking-widest text-white/60">Skills Missing for Goal:</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingSkills.map(skill => (
                    <span key={skill} className="bg-white/10 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-xs font-bold border border-white/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Project Focus */}
          {analysis && (
            <section className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
               <h3 className="text-lg font-black mb-6 flex items-center gap-3 text-slate-800">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                Capstone Challenge
              </h3>
              <div className="p-6 bg-slate-50 rounded-2xl text-slate-700 border border-slate-200">
                <p className="text-sm font-medium leading-relaxed italic">"{analysis.projectIdea}"</p>
              </div>
              <p className="mt-4 text-[11px] text-slate-400 text-center font-bold uppercase tracking-wider">Recommended Completion: Week 4</p>
            </section>
          )}

          {/* User Profile Summary */}
          <section className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
            <h3 className="text-lg font-black mb-6 text-slate-800">Profile Snapshot</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-sm text-slate-400 font-bold uppercase tracking-widest">Level</span>
                <span className="text-sm font-black text-slate-900">{profile.level}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-sm text-slate-400 font-bold uppercase tracking-widest">Commitment</span>
                <span className="text-sm font-black text-slate-900">{profile.studyHoursPerDay}h/day</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {profile.skills.map(s => (
                  <span key={s} className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded font-black uppercase">{s}</span>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Roadmap Display */}
        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="min-h-[600px] flex flex-col items-center justify-center bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 to-transparent"></div>
              <div className="w-20 h-20 border-8 border-blue-600 border-t-transparent rounded-full animate-spin mb-8 shadow-xl shadow-blue-100"></div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">Analyzing Your Potential...</h2>
              <p className="text-slate-500 font-bold text-lg animate-pulse">Mapping out the future of {profile.name} in {profile.sector}</p>
              <div className="mt-12 flex gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          ) : analysis ? (
            <div className="animate-in fade-in slide-in-from-bottom-10 duration-700">
              <RoadmapView steps={analysis.roadmap} />
            </div>
          ) : (
            <div className="h-96 flex flex-col items-center justify-center bg-white rounded-3xl border-4 border-dashed border-slate-200">
              <svg className="w-16 h-16 text-slate-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <p className="text-slate-400 font-black text-lg">No roadmap generated yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
