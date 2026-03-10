import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyDtu0KobvAMGZa7aZC7Cw0KNdXrTer4cQw');

export async function GET() {
  try {
    // Try different model names
    const models = [
      "gemini-1.5-flash",
      "gemini-1.5-pro",
      "gemini-pro",
      "gemini-1.0-pro",
      "models/gemini-1.5-flash",
      "models/gemini-pro"
    ];
    
    const results = {};
    
    for (const modelName of models) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Say 'working' if you can read this");
        const text = result.response.text();
        results[modelName] = { working: true, response: text };
      } catch (e) {
        results[modelName] = { working: false, error: e.message };
      }
    }
    
    return Response.json({ results });
    
  } catch (error) {
    return Response.json({ error: error.message });
  }
}