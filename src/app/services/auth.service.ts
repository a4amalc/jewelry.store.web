import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userDetails:any;
  constructor(private http: HttpClient) { }

  onLogin(request){
    return this.http.post('http://localhost:5000/Auth',request);
  }
}