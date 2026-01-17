
import { Sector, SkillLevel } from './types';

export const SECTORS = [
  Sector.HEALTHCARE,
  Sector.AGRICULTURE,
  Sector.SMART_CITY
];

export const SKILL_LEVELS = [
  SkillLevel.BEGINNER,
  SkillLevel.INTERMEDIATE,
  SkillLevel.ADVANCED
];

export const SUGGESTED_SKILLS: Record<Sector, string[]> = {
  [Sector.HEALTHCARE]: ['Python', 'Data Analysis', 'HL7/FHIR', 'Medical Ethics', 'Machine Learning', 'SQL'],
  [Sector.AGRICULTURE]: ['IoT', 'Remote Sensing', 'GIS', 'Python', 'Sustainable Farming', 'Drone Operation'],
  [Sector.SMART_CITY]: ['Urban Planning', 'Data Visualization', 'AutoCAD', 'Network Security', 'Public Policy', 'BIM']
};
