import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register({ username, email, password }: { [key: string]: string }): Observable<any> {
    return this.http.post(
      `${environment.backend_url}/api/v1/register`,
      { username, email, password },
    );
  }
}
