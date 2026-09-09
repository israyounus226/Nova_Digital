/**
 * Chatbot Configuration
 * ----------------------
 * The webhook URL is read from the environment variable VITE_N8N_WEBHOOK_URL.
 * Set it in your .env file:
 *
 *   VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-webhook-id
 *
 * When the webhook URL is not configured, the chatbot gracefully informs
 * the user that the assistant is not yet connected.
 */

export const CHATBOT_CONFIG = {
  webhookUrl: import.meta.env.VITE_N8N_WEBHOOK_URL || '',
  headerTitle: 'NOVA Assistant',
  statusText: 'Online · AI Customer Support',
  greeting:
    "Hi! I'm NOVA Assistant. I can help you learn about our services, pricing, process, or help you start a project. How can I help you today?",
  quickReplies: [
    'What services do you offer?',
    'How much does a website cost?',
    'Start a project',
  ],
  notConfiguredMessage:
    "I'm not fully connected yet — our AI backend is still being set up. Please reach out to us at hello@novadigital.com and we'll get back to you right away!",
  errorMessage:
    "Sorry, I couldn't reach the server. Please try again in a moment, or email us at hello@novadigital.com.",
} as const;

export type ChatbotConfig = typeof CHATBOT_CONFIG;
