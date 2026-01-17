
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, SkillGapAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generatePersonalizedRoadmap = async (profile: UserProfile): Promise<SkillGapAnalysis> => {
  const prompt = `
    Act as a senior career mentor and industry expert in ${profile.sector}.
    Analyze the following student profile and generate a 4-week personalized learning roadmap to reach their specific goal.
    
    User Profile:
    - Name: ${profile.name}
    - Specific Goal: ${profile.goal}
    - Current Skills: ${profile.skills.join(', ')}
    - Certificates: ${profile.certificates.join(', ')}
    - Target Sector: ${profile.sector}
    - Proficiency Level: ${profile.level}
    - Availability: ${profile.studyHoursPerDay} hours/day
    
    Tasks:
    1. Identify critical missing skills for this sector and goal.
    2. Provide a structured 4-week plan.
    3. Calculate a "Readiness Score" (0-100) based on their current skills vs. the target goal.
    4. Provide a "Baseline Score" which represents a typical student who hasn't started yet (usually 5-10).
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          missingSkills: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          recommendation: {
            type: Type.STRING,
          },
          roadmap: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                week: { type: Type.NUMBER },
                topic: { type: Type.STRING },
                description: { type: Type.STRING },
                resources: { type: Type.ARRAY, items: { type: Type.STRING } },
                tasks: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["week", "topic", "description", "resources", "tasks"]
            }
          },
          projectIdea: {
            type: Type.STRING,
          },
          readinessScore: {
            type: Type.NUMBER,
            description: "How ready the user is for their goal (0-100)."
          },
          baselineScore: {
            type: Type.NUMBER,
            description: "A comparison score for someone starting from scratch (usually 0-10)."
          }
        },
        required: ["missingSkills", "recommendation", "roadmap", "projectIdea", "readinessScore", "baselineScore"]
      }
    }
  });

  try {
    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    return JSON.parse(text) as SkillGapAnalysis;
  } catch (error) {
    console.error("Failed to parse AI response", error);
    throw new Error("AI analysis failed. Please try again.");
  }
};
