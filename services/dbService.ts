
import { UserProfile, SkillGapAnalysis } from "../types";

const USERS_KEY = 'planify_users_db';
const SESSION_KEY = 'planify_current_session';

export interface UserAccount {
  email: string;
  passwordHash: string;
  profile?: UserProfile;
  analysis?: SkillGapAnalysis;
}

// Simple pseudo-hashing for simulation
const hashPassword = (password: string) => btoa(password).split('').reverse().join('');

export const db = {
  getUsers: (): Record<string, UserAccount> => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : {};
  },

  getCurrentUser: (): UserAccount | null => {
    const email = localStorage.getItem(SESSION_KEY);
    if (!email) return null;
    return db.getUsers()[email] || null;
  },

  login: (email: string, pass: string): boolean => {
    const users = db.getUsers();
    const hashed = hashPassword(pass);
    if (users[email] && users[email].passwordHash === hashed) {
      localStorage.setItem(SESSION_KEY, email);
      return true;
    }
    return false;
  },

  signup: (email: string, pass: string): boolean => {
    const users = db.getUsers();
    if (users[email]) return false;
    users[email] = { email, passwordHash: hashPassword(pass) };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(SESSION_KEY, email);
    return true;
  },

  updateAccount: (email: string, newEmail: string, newPass?: string) => {
    const users = db.getUsers();
    if (!users[email]) return false;
    
    const account = { ...users[email] };
    delete users[email];
    
    account.email = newEmail;
    if (newPass) account.passwordHash = hashPassword(newPass);
    
    users[newEmail] = account;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(SESSION_KEY, newEmail);
    return true;
  },

  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  updateProfile: (email: string, profile: UserProfile | null, analysis: SkillGapAnalysis | null) => {
    const users = db.getUsers();
    if (users[email]) {
      users[email].profile = profile || undefined;
      users[email].analysis = analysis || undefined;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  }
};
