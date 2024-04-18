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
  messages: {
    from: string;
    text: string;
    enableScale?: boolean;
    screeningQuestionId?: number;
  }[] = [];
  startSuggestions: string[] = [
    'Take assessment to understand how you feel today.',
    'Deep breath exercises',
    'External resources to help',
    'Emergency hotline numbers',
  ];
  mentalHealthScreeningStartingMessage: string =
    "Hello! Let's begin your mental health screening. Please rate each item on a scale of 1 to 10, with 1 being the lowest and 10 being the highest.";
  mentalHealthScreeningQuestions: string[] = [
    'How energized do you feel today?',
    'How motivated are you feeling right now?',
    'How happy do you feel overall today?',
    'How stressed do you feel at this moment?',
    'How focused do you feel on your tasks or goals today?',
    'How satisfied are you with your current state of mind?',
    'How confident do you feel in your abilities today?',
  ];
  mentalHealthScreeningUserAnswerAcknolegmentMessage: string =
    'Thank you. Continuing.';
  numbers = Array.from({ length: 10 }, (_, i) => i + 1);
  screeningAnswers: { question: string; answer: number }[] = [];

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
    if (
      this.messages.length > 0 &&
      this.messages[this.messages.length - 1].screeningQuestionId !== undefined
    ) {
      const scale = document.getElementById(
        String(this.messages[this.messages.length - 1].screeningQuestionId)
      ) as HTMLSelectElement;
      scale.disabled = true;
    }
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
    if (suggestionId === 0) {
      this.producePreDefinedMentalHealthScreeningQuestions(0);
      return;
    }
    this.addChat(this.startSuggestions[suggestionId]);
  }

  async producePreDefinedMentalHealthScreeningQuestions(questionId: number) {
    if (questionId === 0) {
      this.messages.push({
        from: 'user',
        text: this.startSuggestions[0],
      });
      this.scrollChat();
      this.botTyping = true;
      await this.timeout(1000);
      this.botTyping = false;

      this.messages.push({
        from: 'bot',
        text: this.mentalHealthScreeningStartingMessage,
      });
      this.scrollChat();
    } else if (questionId < 6) {
      this.messages.push({
        from: 'bot',
        text: this.mentalHealthScreeningUserAnswerAcknolegmentMessage,
      });
      this.scrollChat();
    }

    this.messages.push({
      from: 'bot',
      text: this.mentalHealthScreeningQuestions[questionId],
      enableScale: true,
      screeningQuestionId: questionId,
    });
    this.scrollChat();
  }

  async mentalHealthScreeningQuestionAnswerSelected(
    scale: HTMLSelectElement,
    questionId?: number
  ) {
    const aiEmtpyResponsePlaceholder =
      'I am sorry, I do not have an answer for that. Can you please ask me something else?';

    if (questionId === undefined) return;
    scale.disabled = true;
    this.messages.push({ from: 'user', text: scale.value });
    this.scrollChat();

    this.botTyping = true;
    await this.timeout(1000);
    this.botTyping = false;

    const ques =
      'On a scale of 1 to 10, ' +
      this.mentalHealthScreeningQuestions[questionId];

    this.screeningAnswers.push({
      question: ques,
      answer: parseInt(scale.value),
    });

    if (questionId === 6) {
      const screeningQuestionForAI = `You are tasked with screening for potential mental health conditions based on user responses to a series of questions. The responses are provided as a stringified array of objects. Each object contains a question and its corresponding answer. After performing the screening, ask the user if they have any additional support questions.

      Here's the data:
      ${JSON.stringify(this.screeningAnswers)}
    
      Please analyze the responses to screen for any potential mental health conditions. If any conditions are identified, provide your diagnosis. After diagnosis, ask the user if they have any support questions.
      `;
      this.botTyping = true;
      this.scrollChat();

      const { aiResponseText, error } = await this.openAiSerivice.getAIResponse(
        screeningQuestionForAI
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
        content: screeningQuestionForAI,
      });
      this.openAiSerivice.chatHistoryWithAI.push({
        role: 'assistant',
        content:
          aiResponseText?.replace(/\n/g, '<br>') ?? aiEmtpyResponsePlaceholder,
      });
      return;
    }

    this.producePreDefinedMentalHealthScreeningQuestions(questionId + 1);
  }

  timeout(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
