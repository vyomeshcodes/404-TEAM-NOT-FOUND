
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, SkillGapAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generatePersonalizedRoadmap = async (profile: UserProfile): Promise<SkillGapAnalysis> => {
  const prompt = `
    Act as a senior career mentor and industry expert in ${profile.sector}.
    Analyze the following student profile and generate a 4-week high-impact learning roadmap.
    
    User Profile:
    - Goal: ${profile.goal}
    - Current Skills: ${profile.skills.join(', ')}
    - Level: ${profile.level}
    
    Tasks:
    1. Identify skill gaps.
    2. Provide a 4-week roadmap.
    3. For EACH week, suggest 2 realistic video course titles (e.g., from Coursera/Udemy/YouTube).
    4. Provide 2-3 specific project ideas to build a portfolio.
    5. Calculate scores.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          missingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
          recommendation: { type: Type.STRING },
          roadmap: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                week: { type: Type.NUMBER },
                topic: { type: Type.STRING },
                description: { type: Type.STRING },
                resources: { type: Type.ARRAY, items: { type: Type.STRING } },
                tasks: { type: Type.ARRAY, items: { type: Type.STRING } },
                suggestedCourses: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      platform: { type: Type.STRING },
                      url: { type: Type.STRING },
                      thumbnail: { type: Type.STRING }
                    },
                    required: ["title", "platform"]
                  }
                }
              },
              required: ["week", "topic", "description", "tasks", "suggestedCourses"]
            }
          },
          projectIdea: { type: Type.STRING },
          featuredProjects: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                difficulty: { type: Type.STRING },
                description: { type: Type.STRING }
              }
            }
          },
          readinessScore: { type: Type.NUMBER },
          baselineScore: { type: Type.NUMBER }
        },
        required: ["missingSkills", "recommendation", "roadmap", "projectIdea", "readinessScore", "baselineScore"]
      }
    }
  });

  try {
    return JSON.parse(response.text || '{}') as SkillGapAnalysis;
  } catch (error) {
    console.error("Failed to parse AI response", error);
    throw new Error("AI analysis failed.");
  }
};
