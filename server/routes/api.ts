import express from 'express';

const router = express.Router();

interface GroqMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

const GROQ_API_KEY = process.env.GROQ_API_KEY;

const callGroqAPI = async (messages: GroqMessage[], model: string = 'mixtral-8x7b-32768'): Promise<string> => {
  if (!GROQ_API_KEY) {
    throw new Error('Groq API key is missing');
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model,
      messages: messages,
      temperature: 0.7,
      max_tokens: 2048,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Groq API error: ${response.statusText} - ${error}`);
  }

  const data = (await response.json()) as GroqResponse;
  return data.choices[0].message.content;
};

router.post('/chat', async (req, res) => {
  try {
    const { messages, model } = req.body;
    const result = await callGroqAPI(messages, model || 'mixtral-8x7b-32768');
    res.json({ content: result });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
