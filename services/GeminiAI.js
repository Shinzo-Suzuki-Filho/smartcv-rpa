import { GoogleGenerativeAI } from '@google/generative-ai';

// In a real app, this would be in an environment variable
const API_KEY = "YOUR_GEMINI_API_KEY"; 

const genAI = new GoogleGenerativeAI(API_KEY);

export async function optimizeContent(content, type) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Como um especialista em recrutamento de elite, melhore este ${type} para um currículo profissional: "${content}". Use palavras-chave fortes e foco em resultados. Responda apenas o texto melhorado em Português Brasileiro.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Service Error:", error);
    return content; // Fallback to original content
  }
}

export async function chatWithAI(message, history = []) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Chat Error:", error);
    return "Desculpe, tive um problema ao processar sua solicitação. Verifique sua conexão.";
  }
}
