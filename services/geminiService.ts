import { DomainType } from "../types";

interface GroqMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const callGroqAPI = async (messages: GroqMessage[], model: string = 'mixtral-8x7b-32768'): Promise<string> => {
  const response = await fetch('http://localhost:5000/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: messages,
      model: model,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API error: ${response.statusText} - ${error}`);
  }

  const data = await response.json() as { content: string };
  return data.content;
};

export const generateSkillAnalysis = async (domain: DomainType, userProfile: string) => {
  const prompt = `Analyze the skill gap for a professional in ${domain}. 
    Current profile: ${userProfile}. 
    Return ONLY a JSON object with a list of 6 skills, each having 'subject', 'current' (0-100), 'required' (100 for all). 
    Do not include any additional text or markdown formatting.`;

  try {
    const response = await callGroqAPI([
      { role: 'system', content: 'You are a career analysis AI. Return valid JSON only.' },
      { role: 'user', content: prompt }
    ], 'mixtral-8x7b-32768');

    return JSON.parse(response);
  } catch (error) {
    console.error('Failed to generate skill analysis:', error);
    // Fallback mock analysis
    return {
      skills: [
        { subject: 'Core Concepts', current: 45, required: 100 },
        { subject: 'Platform Tooling', current: 40, required: 100 },
        { subject: 'Domain Algorithms', current: 35, required: 100 },
        { subject: 'Data Handling', current: 50, required: 100 },
        { subject: 'Deployment', current: 30, required: 100 },
        { subject: 'Security & Compliance', current: 25, required: 100 }
      ]
    };
  }
};

export const generateRoadmap = async (domain: DomainType, currentSkills: string[], goal: string) => {
  const prompt = `Act as a senior career architect in ${domain}. A specialist has these skills: ${currentSkills.join(', ')}. 
    Goal: ${goal}. 
    1. Identify missing technical skills for this specific domain.
    2. Provide REAL, current, and active redirectable course links (Coursera/Udemy/edX).
    3. Return ONLY a JSON array of 5 steps, each with 'title', 'description', 'estimatedWeeks', and 'courseLink'.
    Do not include any additional text or markdown formatting.`;

  try {
    const response = await callGroqAPI([
      { role: 'system', content: 'You are a career roadmap architect. Return valid JSON only.' },
      { role: 'user', content: prompt }
    ], 'mixtral-8x7b-32768');

    return JSON.parse(response);
  } catch (error) {
    console.error('Failed to generate roadmap:', error);
    // Fallback roadmap for client-side usage
    return [
      { title: 'Foundation & Concepts', description: `Understand core ${domain} concepts and tools.`, estimatedWeeks: 4, courseLink: 'https://www.coursera.org/' },
      { title: 'Tooling & Workflows', description: 'Hands-on use of common platform tools and pipelines.', estimatedWeeks: 6, courseLink: 'https://www.udemy.com/' },
      { title: 'Applied Projects', description: 'Build sector-specific projects to apply learning.', estimatedWeeks: 8, courseLink: 'https://www.edx.org/' },
      { title: 'Architectural Patterns', description: 'Learn scalable system design patterns for the domain.', estimatedWeeks: 6, courseLink: 'https://www.coursera.org/' },
      { title: 'Portfolio & Network', description: 'Polish portfolio, publish projects, and engage with mentors.', estimatedWeeks: 4, courseLink: 'https://www.linkedin.com/learning/' }
    ];
  }
};

export const generateQuizQuestions = async (domain: DomainType) => {
  const prompt = `Generate 10 advanced technical multiple-choice questions for ${domain}. 
    Return ONLY a JSON array where each item has 'question', 'options' (array of 4 strings), and 'correctIndex' (number 0-3).
    Do not include any additional text or markdown formatting.`;

  try {
    const response = await callGroqAPI([
      { role: 'system', content: 'You are a technical assessment expert. Return valid JSON only.' },
      { role: 'user', content: prompt }
    ], 'mixtral-8x7b-32768');

    return JSON.parse(response);
  } catch (error) {
    console.error('Failed to generate quiz questions:', error);
    return [];
  }
};

export const aiRewritePortfolio = async (text: string) => {
  const prompt = `Rewrite this portfolio section professionally and corporately: "${text}". No emojis. Return only the rewritten text without any additional commentary.`;

  try {
    const response = await callGroqAPI([
      { role: 'system', content: 'You are a professional portfolio writer. Return only the rewritten text.' },
      { role: 'user', content: prompt }
    ], 'mixtral-8x7b-32768');

    return response;
  } catch (error) {
    console.error('Failed to rewrite portfolio:', error);
    return text;
  }
};

export const getMentorResponse = async (domain: DomainType, history: any[], message: string) => {
  const messages: GroqMessage[] = [
    { role: 'system', content: `You are an elite mentor in ${domain}. Tone: Professional, technical, concise. No bold characters.` }
  ];

  // Add conversation history
  for (const msg of history) {
    messages.push({ role: msg.role, content: msg.content });
  }

  // Add current message
  messages.push({ role: 'user', content: message });

  try {
    const response = await callGroqAPI(messages, 'mixtral-8x7b-32768');
    return response;
  } catch (error) {
    console.error('Failed to get mentor response:', error);
    return 'I am your mentor AI, but I encountered an error. Please try again.';
  }
};
