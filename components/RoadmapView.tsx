
import React from 'react';
import { RoadmapStep } from '../types';

interface RoadmapViewProps {
  steps: RoadmapStep[];
}

const RoadmapView: React.FC<RoadmapViewProps> = ({ steps }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-slate-900">Weekly Learning Roadmap</h2>
        <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-widest">
          AI Personalized
        </div>
      </div>

      <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
        {steps.map((step, idx) => (
          <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            {/* Timeline Icon */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 group-hover:bg-blue-600 transition-colors shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              <span className="text-xs font-bold text-slate-500 group-hover:text-white">{step.week}</span>
            </div>

            {/* Content Card */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Week {step.week}</span>
                <h4 className="text-lg font-bold text-slate-900">{step.topic}</h4>
              </div>
              <p className="text-sm text-slate-600 mb-4">{step.description}</p>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-xs font-bold text-slate-400 uppercase mb-2">Resources</h5>
                  <ul className="space-y-1">
                    {step.resources.map((res, i) => (
                      <li key={i} className="text-sm text-blue-600 hover:underline cursor-pointer flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        {res}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-xs font-bold text-slate-400 uppercase mb-2">Key Tasks</h5>
                  <ul className="space-y-2">
                    {step.tasks.map((task, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <input type="checkbox" className="mt-1 h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                        <span className="text-sm text-slate-700">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapView;
