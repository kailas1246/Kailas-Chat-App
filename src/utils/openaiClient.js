import OpenAI from 'openai';

/**
 * Initializes the OpenAI client with the API key from environment variables.
 * @returns {OpenAI} Configured OpenAI client instance.
 */
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Required for client-side usage in React
});

/**
 * Generates a chat completion response based on user input.
 * @param {string} userMessage - The user's input message.
 * @returns {Promise<string>} The assistant's response.
 */
export async function getChatCompletion(userMessage) {
  try {
    const response = await openai?.chat?.completions?.create({
      model: 'gpt-4o-mini',
      messages: [
        { 
          role: 'system', 
          content: 'You are KailasBot, a premium AI assistant with a sophisticated and helpful personality. Provide clear, concise, and valuable responses. Be professional yet approachable, and always aim to be genuinely helpful to users.'
        },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response?.choices?.[0]?.message?.content;
  } catch (error) {
    console.error('Error in chat completion:', error);
    
    // Fallback responses for API errors
    const fallbackResponses = [
      "I\'m experiencing a temporary issue connecting to my AI service. Please try again in a moment.",
      "Sorry, I'm having trouble processing your request right now. Could you please retry?",
      "I\'m currently unable to generate a response. Please check your internet connection and try again."
    ];
    
    return fallbackResponses?.[Math.floor(Math.random() * fallbackResponses?.length)];
  }
}

/**
 * Streams a chat completion response chunk by chunk for real-time experience.
 * @param {string} userMessage - The user's input message.
 * @param {Function} onChunk - Callback to handle each streamed chunk.
 */
export async function getStreamingChatCompletion(userMessage, onChunk) {
  try {
    const stream = await openai?.chat?.completions?.create({
      model: 'gpt-4o-mini',
      messages: [
        { 
          role: 'system', 
          content: 'You are KailasBot, a premium AI assistant with a sophisticated and helpful personality. Provide clear, concise, and valuable responses. Be professional yet approachable, and always aim to be genuinely helpful to users.'
        },
        { role: 'user', content: userMessage },
      ],
      stream: true,
      temperature: 0.7,
      max_tokens: 500,
    });

    for await (const chunk of stream) {
      const content = chunk?.choices?.[0]?.delta?.content || '';
      if (content) {
        onChunk(content);
      }
    }
  } catch (error) {
    console.error('Error in streaming chat completion:', error);
    onChunk("I'm experiencing a temporary issue. Please try again in a moment.");
  }
}

export default openai;