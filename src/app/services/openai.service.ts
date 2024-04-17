import { Injectable } from '@angular/core';
import { OpenAI } from 'openai';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OpenaiService {
  openai: OpenAI = new OpenAI({
    apiKey: environment.openAIAPISecretKey,
    dangerouslyAllowBrowser: true,
  });

  constructor() {}

  async getAIResponse(input: string) {
    try {
      const gptResponse = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a Mental Health Screening and Support Chatbot and your name is Zoey. 
              You are here to help users with their mental health concerns. Please me bit empathetic and supportive. 
              Do not reply to any queries that are not related to mental health.`,
          },
          { role: 'user', content: input },
        ],
      });
      return { aiResponseText: gptResponse.choices[0].message.content };
    } catch (error: any) {
      return { error: error.message };
    }
  }
}
