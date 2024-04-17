import { Injectable } from '@angular/core';
import { OpenAI } from 'openai';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class OpenaiService {
  openai: OpenAI = new OpenAI({
    apiKey: environment.openAIAPISecretKey,
    dangerouslyAllowBrowser: true,
  });

  chatHistoryWithAI: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];

  constructor(private toastr: ToastrService) {}

  async getAIResponse(input: string) {
    try {
      const gptResponse = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a Mental Health Screening and Support Chatbot and your name is Zoey. 
              You are here to help users with their mental health concerns. Please me bit empathetic and supportive. 
              Do not reply to any queries that are not related to mental health. Also consider history of conversation when giing new answers for user`,
          },
          ...this.chatHistoryWithAI,
          { role: 'user', content: input },
        ],
      });
      return { aiResponseText: gptResponse.choices[0].message.content };
    } catch (error: any) {
      this.toastr.error(error.message);
      return { error };
    }
  }
}
