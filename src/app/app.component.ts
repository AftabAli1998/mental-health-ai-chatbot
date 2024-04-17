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
  messages: { from: string; text: string }[] = [
    { from: 'bot', text: 'Hello world!' },
  ];

  constructor(private openAiSerivice: OpenaiService) {}

  updateChat(input: HTMLInputElement): void {
    if (input.value.trim()) {
      this.output(input.value.trim());
      input.value = '';
    }
  }

  output(input: string): void {
    this.addChat(input);
  }

  async addChat(input: string) {
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

    this.botTyping = false;
    this.messages.push({
      from: 'bot',
      text: aiResponseText?.replace(/\n/g, '<br>') ?? '',
    });
    this.scrollChat();
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
}
