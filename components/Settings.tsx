
import React, { useState } from 'react';
import { db } from '../services/dbService';

interface SettingsProps {
  email: string;
  onClose: () => void;
  onUpdate: (newEmail: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ email, onClose, onUpdate }) => {
  const [newEmail, setNewEmail] = useState(email);
  const [newPass, setNewPass] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSave = () => {
    setIsUpdating(true);
    setTimeout(() => {
      if (db.updateAccount(email, newEmail, newPass || undefined)) {
        onUpdate(newEmail);
        onClose();
      }
      setIsUpdating(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl relative z-10 p-10 border border-slate-100 dark:border-slate-800 animate-in zoom-in duration-300">
        <h2 className="text-3xl font-black mb-8 dark:text-white">Account Settings</h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
            <input 
              type="email" 
              value={newEmail} 
              onChange={e => setNewEmail(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none dark:text-white"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">New Password (Optional)</label>
            <input 
              type="password" 
              placeholder="Leave blank to keep current"
              value={newPass} 
              onChange={e => setNewPass(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none dark:text-white"
            />
          </div>
          
          <div className="flex gap-4 pt-4">
            <button 
              onClick={onClose}
              className="flex-1 py-4 font-bold text-slate-500 hover:text-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={isUpdating}
              className="flex-1 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 disabled:opacity-50"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
