import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login({ username, password }: { [key: string]: string }): Observable<any> {
    return this.http.post(
      `${environment.backend_url}/api/v1/login`,
      { username, password }
    );
  }
}
