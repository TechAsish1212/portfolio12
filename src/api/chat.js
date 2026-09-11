// api/chat.js
import { GoogleGenAI } from '@google/genai';
import { SYSTEM_PROMPT } from './knowledge.js';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// ... rate limiting (keep as-is) ...

  // Build conversation history
  const conversation = messages
    .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
    .join('\n');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `${SYSTEM_PROMPT}\n\n--- Conversation ---\n${conversation}\nAssistant:`,
    });

    const reply = response.text || 'Sorry, I could not generate a response.';
    return res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'AI service error' });
  }