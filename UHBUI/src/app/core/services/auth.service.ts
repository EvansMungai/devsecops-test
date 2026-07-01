import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

import { UserDetails } from '../interfaces/userData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: UserDetails | null = null;
  private apiUrl = 'http://localhost:5000';
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private isBrowser: boolean;

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      const userData = localStorage.getItem('user');
      if (userData) {
        this.currentUser = JSON.parse(userData);
      }
    }
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  getToken() : string | null {
    return localStorage.getItem('token');
  }

  login(data: any): Observable<any> {
    const params = new HttpParams().set('platform', 'web');
    return this.http.post(`${this.apiUrl}/login`, data, { params });
  }
  getUser(): UserDetails | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  setUser(user: UserDetails): void {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }
  getRole(): string | null {
    return this.currentUser?.roles[0] ?? null;
  }
  hasRole(role: string): boolean {
    const user = this.getUser();
    return user?.roles?.includes(role) ?? false;
  }
  hasAnyRole(roles: string[]): boolean {
    const user = this.getUser();

    if(!user?.roles){
      return false;
    }
    return roles.some(role => user.roles.includes(role));
  }
  changePassword(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/change-password`, data, { withCredentials: true });
  }
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('user');
  }
}
