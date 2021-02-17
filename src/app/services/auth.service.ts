import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userDetails: any;
  constructor(private http: HttpClient) { }

  onLogin(request) {
    return this.http.post(environment.apiUrl + 'Auth/Login', request);
  }

  getAppSettings() {
    return this.http.get(environment.apiUrl + 'Auth/GetAppSettings');
  }
}