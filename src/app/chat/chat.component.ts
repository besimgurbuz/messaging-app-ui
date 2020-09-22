import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import MessageData from '../model/MessageData';
import { AuthenticateService } from '../service/authenticate.service';
import { ChatService } from '../service/chat.service';
import { ChatDataService } from './chat-data.service';
import ChatData from './ChatData';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  openedRoom = '';
  chatData: Array<ChatData>;
  startChatForm: FormGroup;

  constructor(
    private chatService: ChatService,
    private chatDataService: ChatDataService,
    private router: Router,
    private auth: AuthenticateService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getChatData();

    this.startChatForm = this.fb.group({
      username: ['', [Validators.required]]
    });
  }

  getChatData() {
    this.chatDataService.getChatData().subscribe({
      next: result => {
        this.chatData = result;
      },
      error: err => {
        console.error(err);
      }
    });
  }

  createChat() {
    const { value } = this.startChatForm.controls.username;

    if (!this.startChatForm.controls.username.hasError('required')) {
      this.chatDataService.createChat(value).subscribe({
        next: res => {
          this._snackBar.open('Chat created', 'Close', { duration: 2000 });
          this.getChatData();
        },
        error: err => {
          this._snackBar.open(err.error.message, 'Close', { duration: 2000 });
        }
      });
    }
  }

  changeLastMessage(event) {
    this.getChatData();
  }

  getChatTitle(id: string): string {
    return this.chatData.find(data => data._id === id).receiver[0];
  }

  logout(): void {
    this.auth.removeUserData();
    this.router.navigate(['/']);
  }

  joinRoom(roomId) {
    this.chatService.joinRoom(roomId, this.auth.getToken);
  }

  openRoom(id: string) {
    this.openedRoom = id;
    this.joinRoom(id);
  }

  returnLastMessage(messages: MessageData[]) {
    return messages[messages.length - 1]?.body;
  }
}
