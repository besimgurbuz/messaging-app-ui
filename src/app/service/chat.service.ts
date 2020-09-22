import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import MessageData from '../model/MessageData';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket;

  constructor() {
    this.socket = io(environment.backend_url);
  }

  public joinRoom(roomId, token): void {
    this.socket.emit('joinRoom', { roomId, token });
  }

  public sendMessage({ roomId, token, msg }) {

    this.socket.emit('chatMessage', { roomId, token, msg });
  }

  public getMessages(): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on('message', (message) => {
        subscriber.next(message);
      });
    });
  }
}
