import { Component, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import MessageData from 'src/app/model/MessageData';
import { AuthenticateService } from 'src/app/service/authenticate.service';
import { ChatService } from 'src/app/service/chat.service';
import { ChatDataService } from '../chat-data.service';
import ChatData from '../ChatData';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, OnChanges, OnDestroy {
  @Input() roomId: string;
  @Output() lastMessageChanged = new EventEmitter();
  messageForm: FormGroup;
  messageSubscription: Subscription;
  messages: MessageData[] = [];
  userData;

  constructor(
    private fb: FormBuilder,
    private chatDataService: ChatDataService,
    private auth: AuthenticateService,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.messageForm = this.fb.group({
      message: ['', [Validators.required]]
    });

    this.userData = this.auth.userData;
    this.initMessages();

    this.messageSubscription = this.chatService.getMessages().subscribe((messageData) => {
      this.outputMessage(messageData);
    });
  }

  ngOnChanges() {
    if (this.messageForm) {
      this.messageForm.controls.message.setValue('');
      this.messages = [];
      this.initMessages();
    }
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }

  initMessages() {
    this.chatDataService.getChatById(this.roomId).subscribe((data: ChatData) => {
      data.messages.forEach(message => this.messages.push(message));
    });
  }

  submitMessage() {
    const { value } = this.messageForm.controls.message;
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date();
    const time = `${date.getHours()}:${date.getMinutes()}`;
    const values: MessageData = {
      username: this.auth.userData.username,
      date: `${date.toLocaleDateString(undefined, options)} ${time}`,
      body: value
    };

    if (!this.messageForm.controls.message.hasError('required')) {
      this.chatService.sendMessage({ roomId: this.roomId, token: this.auth.getToken, msg: values });
      this.lastMessageChanged.emit();
      this.messageForm.controls.message.setValue('');
    }
  }

  outputMessage(msg): void {
    this.messages.push(msg);
    const messageArea = document.querySelector('.messages');

    setTimeout(() => messageArea.scrollTop = messageArea.scrollHeight, 100);
  }
}
