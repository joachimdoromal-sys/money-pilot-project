import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyD4kkRX36ZJPOlRbBMQIVktzTkZONCQWTs');

export async function POST(req) {
  try {
    const { messages } = await req.json();
    
    // Get the last 10 messages for context
    const recentMessages = messages.slice(-10);
    
    // Build conversation history
    let conversation = "You are Money Pilot AI, a friendly financial assistant. Keep responses helpful and concise (2-3 sentences).\n\n";
    
    for (const msg of recentMessages) {
      const role = msg.role === 'user' ? 'User' : 'Assistant';
      conversation += `${role}: ${msg.content}\n`;
    }
    
    conversation += "Assistant: ";

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const result = await model.generateContent(conversation);
    const response = await result.response;
    const text = response.text();

    return Response.json({ message: text });
    
  } catch (error) {
    console.error("❌ Error:", error);
    return Response.json({ 
      message: "Hi! I'm your Money Pilot AI. How can I help with your finances today?" 
    });
  }
}

export async function GET() {
  return Response.json({ message: "Send a POST request to chat" });
}