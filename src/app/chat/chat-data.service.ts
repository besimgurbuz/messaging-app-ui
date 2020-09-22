import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticateService } from '../service/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class ChatDataService {

  constructor(private http: HttpClient, private auth: AuthenticateService) { }

  getChatData(): Observable<any> {
    const headers = {
      'Auth-Token': this.auth.getToken
    };
    return this.http.get(`${environment.backend_url}/api/v1/chat`, { headers });
  }

  getChatById(id: string): Observable<any> {
    const headers = {
      'Auth-Token': this.auth.getToken
    };

    return this.http.get(`${environment.backend_url}/api/v1/chat/${id}`, { headers });
  }

  createChat(receiver: string) {
    const headers = {
      'Auth-Token': this.auth.getToken
    };

    return this.http.post(`${environment.backend_url}/api/v1/chat`, { receiver }, { headers });
  }
}
