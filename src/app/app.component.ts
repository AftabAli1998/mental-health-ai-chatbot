import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OpenaiService } from './services/openai.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  botTyping: boolean = false;
  messages: { from: string; text: string }[] = [];
  startSuggestions: string[] = [
    'Take assessment to understand how you feel today.',
    'Deep breath exercises',
    'External resources to help',
    'Emergency hotline numbers',
  ];

  constructor(private openAiSerivice: OpenaiService) {}

  updateChat(input: HTMLInputElement): void {
    if (input.value.trim() && !this.botTyping) {
      this.output(input.value.trim());
      input.value = '';
    }
  }

  output(input: string): void {
    this.addChat(input);
  }

  async addChat(input: string) {
    const aiEmtpyResponsePlaceholder =
      'I am sorry, I do not have an answer for that. Can you please ask me something else?';

    this.messages.push({
      from: 'user',
      text: input,
    });

    this.scrollChat();

    this.botTyping = true;
    this.scrollChat();

    const { aiResponseText, error } = await this.openAiSerivice.getAIResponse(
      input
    );

    if (error) {
      this.botTyping = false;
      return;
    }

    this.botTyping = false;
    this.messages.push({
      from: 'bot',
      text:
        aiResponseText?.replace(/\n/g, '<br>') ?? aiEmtpyResponsePlaceholder,
    });
    this.scrollChat();

    this.openAiSerivice.chatHistoryWithAI.push({
      role: 'user',
      content: input,
    });
    this.openAiSerivice.chatHistoryWithAI.push({
      role: 'assistant',
      content:
        aiResponseText?.replace(/\n/g, '<br>') ?? aiEmtpyResponsePlaceholder,
    });
  }

  scrollChat(): void {
    setTimeout(() => {
      const messagesContainer = document.getElementById('messages');
      if (messagesContainer) {
        messagesContainer.scrollTop =
          messagesContainer.scrollHeight - messagesContainer.clientHeight;
        setTimeout(() => {
          messagesContainer.scrollTop =
            messagesContainer.scrollHeight - messagesContainer.clientHeight;
        }, 100);
      }
    });
  }

  handleStartSuggestionClick(suggestionId: number) {
    this.addChat(this.startSuggestions[suggestionId]);
  }
}
