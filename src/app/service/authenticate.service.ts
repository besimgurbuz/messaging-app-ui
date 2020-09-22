import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private token;

  constructor() { }

  saveUser(token, user): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  removeUserData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  get isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  set setToken(str: string) {
    this.token = str;
  }

  get isTokenInMemory(): boolean {
    return !!this.token;
  }

  get getToken(): string {
    return localStorage.getItem('token') || this.token;
  }

  get userData() {
    const data = localStorage.getItem('user');

    return JSON.parse(data);
  }
}
