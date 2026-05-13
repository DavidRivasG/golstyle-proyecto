import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewChecked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService, ChatMessage } from '../../services/chatbot.service';

interface DisplayMessage {
  role: 'user' | 'bot';
  text: string;
  loading?: boolean;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css',
})
export class ChatbotComponent implements AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  isOpen = false;
  userInput = '';
  isLoading = false;

  messages: DisplayMessage[] = [
    {
      role: 'bot',
      text: '¡Hola! Soy GolBot, el asistente de GolStyle ⚽ ¿En qué puedo ayudarte?',
    },
  ];

  private history: ChatMessage[] = [];
  private shouldScroll = false;

  constructor(private chatbotService: ChatbotService) {}

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.shouldScroll = true;
    }
  }

  sendMessage(): void {
    const text = this.userInput.trim();
    if (!text || this.isLoading) return;

    this.messages.push({ role: 'user', text });
    this.userInput = '';
    this.isLoading = true;
    this.shouldScroll = true;

    const loadingMsg: DisplayMessage = { role: 'bot', text: '', loading: true };
    this.messages.push(loadingMsg);

    this.chatbotService.sendMessage(text, this.history).subscribe({
      next: (res) => {
        this.history.push({ role: 'user', text });
        this.history.push({ role: 'model', text: res.reply });

        // Keep history manageable (last 10 turns)
        if (this.history.length > 20) {
          this.history = this.history.slice(-20);
        }

        const idx = this.messages.lastIndexOf(loadingMsg);
        if (idx !== -1) {
          this.messages[idx] = { role: 'bot', text: res.reply };
        }

        this.isLoading = false;
        this.shouldScroll = true;
      },
      error: () => {
        const idx = this.messages.lastIndexOf(loadingMsg);
        if (idx !== -1) {
          this.messages[idx] = {
            role: 'bot',
            text: 'Lo siento, no pude conectar con el asistente. Inténtalo de nuevo.',
          };
        }
        this.isLoading = false;
        this.shouldScroll = true;
      },
    });
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } catch {}
  }
}
