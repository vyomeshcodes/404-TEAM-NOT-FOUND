
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
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-700 space-y-12">
      {/* Top Profile Card */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col lg:flex-row gap-12 items-center">
        <div className="flex-1 flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center text-white text-5xl font-black shadow-xl rotate-3">
            {profile.name[0]}
          </div>
          <div className="text-center md:text-left space-y-3">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">{profile.name}</h1>
            <p className="text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest text-sm">{profile.sector}</p>
            <p className="text-slate-500 dark:text-slate-400 italic">"{profile.goal}"</p>
          </div>
        </div>
        
        <div className="w-full lg:w-96 bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[2rem] space-y-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-black text-slate-400 uppercase">Readiness Index</span>
            <span className="text-2xl font-black text-blue-600">{analysis?.readinessScore}%</span>
          </div>
          <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-1000"
              style={{ width: `${analysis?.readinessScore || 0}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Roadmap */}
        <div className="lg:col-span-7 space-y-12">
          {isLoading ? (
            <div className="h-[600px] bg-white dark:bg-slate-900 rounded-[3rem] animate-pulse flex flex-col items-center justify-center border border-slate-100 dark:border-slate-800">
               <div className="w-20 h-20 border-8 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
               <p className="mt-8 text-xl font-black text-slate-400 uppercase tracking-widest">AI Mapping Path...</p>
            </div>
          ) : analysis && (
            <RoadmapView steps={analysis.roadmap} />
          )}
        </div>

        {/* Right Column: Resources & Projects */}
        <div className="lg:col-span-5 space-y-12">
          {/* Featured Courses */}
          <section className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800">
            <h3 className="text-2xl font-black mb-8 dark:text-white flex items-center gap-3">
              <span className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-xl">📺</span>
              Curated Courses
            </h3>
            <div className="space-y-4">
              {analysis?.roadmap.map((week, idx) => (
                <div key={idx} className="space-y-3">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Week {week.week} Picks</p>
                  {week.suggestedCourses.map((c, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer border border-transparent hover:border-blue-200">
                      <div className="w-16 h-12 bg-slate-200 dark:bg-slate-700 rounded-lg shrink-0 overflow-hidden">
                        <img src={`https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg`} alt="Course" className="w-full h-full object-cover opacity-50" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-bold text-slate-900 dark:text-white truncate text-sm">{c.title}</p>
                        <p className="text-xs text-blue-600 dark:text-blue-400 font-black">{c.platform}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* Projects Gallery */}
          <section className="bg-gradient-to-br from-slate-900 to-indigo-950 p-10 rounded-[2.5rem] shadow-2xl text-white">
            <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
              <span className="p-2 bg-white/10 rounded-xl">🏗️</span>
              Portfolio Projects
            </h3>
            <div className="space-y-6">
              {analysis?.featuredProjects?.map((p, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-2 hover:bg-white/10 transition-colors">
                  <div className="flex justify-between items-center">
                    <p className="font-black text-blue-400 text-xs uppercase">{p.difficulty}</p>
                  </div>
                  <h4 className="text-lg font-black">{p.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{p.description}</p>
                </div>
              ))}
              {!analysis?.featuredProjects && (
                 <div className="p-6 bg-white/5 rounded-2xl italic text-slate-500">
                   {analysis?.projectIdea}
                 </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
