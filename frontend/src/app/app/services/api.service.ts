import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:4000/api';

  constructor(private http: HttpClient) { }

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(data: any): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, data);
  }

  adminLogin(data: any): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/admin/login`, data);
  }

  me(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/me`, { headers: this.authHeaders() });
  }

  uploadDocuments(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload`, formData, { headers: this.authHeaders() });
  }

  listUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`, { headers: this.authHeaders() });
  }

  getUser(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${id}`, { headers: this.authHeaders() });
  }

  updateStatus(id: string, status: string, reason?: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/user/${id}/status`, { status, reason }, { headers: this.authHeaders() });
  }
}
