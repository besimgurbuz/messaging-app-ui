import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticateService } from './authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class BlockUserService {

  constructor(private http: HttpClient, private auth: AuthenticateService) { }

  blockUser(username: string): Observable<any> {
    const headers = {
      'Auth-Token': this.auth.getToken
    };
    return this.http.post(`${environment.backend_url}/api/v1/block-user`, { block: username }, { headers });
  }
}
