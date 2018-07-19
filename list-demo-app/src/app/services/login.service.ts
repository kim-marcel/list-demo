import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  loginUrl = 'http://localhost:8080/login';

  login() {
    this.getLoginUrl()
      .subscribe(data => {
        document.location.href = 'http://localhost:8080' + data['loginUrl'];
      });
  }

  getLoginUrl() {
    return this.http.get(this.loginUrl);
  }
}
