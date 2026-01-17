
export enum Sector {
  HEALTHCARE = 'Healthcare Informatics',
  AGRICULTURE = 'Agricultural Technology',
  SMART_CITY = 'Urban & Smart City Systems'
}

export enum SkillLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}

export interface UserProfile {
  name: string;
  goal: string;
  skills: string[];
  certificates: string[];
  sector: Sector;
  studyHoursPerDay: number;
  level: SkillLevel;
}

export interface RoadmapStep {
  week: number;
  topic: string;
  description: string;
  resources: string[];
  tasks: string[];
}

export interface SkillGapAnalysis {
  missingSkills: string[];
  recommendation: string;
  roadmap: RoadmapStep[];
  projectIdea: string;
  readinessScore: number; // 0-100 score
  baselineScore: number; // Comparison score for a total beginner
}
