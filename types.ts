
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

export interface Course {
  title: string;
  platform: string;
  url: string;
  thumbnail: string;
}

export interface Project {
  title: string;
  difficulty: string;
  description: string;
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
  suggestedCourses: Course[];
}

export interface SkillGapAnalysis {
  missingSkills: string[];
  recommendation: string;
  roadmap: RoadmapStep[];
  projectIdea: string;
  featuredProjects: Project[];
  readinessScore: number;
  baselineScore: number;
}
