import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http: HttpClient) { }

  logoutUrl = 'http://localhost:8080/logout';

  logout() {
    this.getLogoutUrl()
      .subscribe(data => {
        document.location.href = 'http://localhost:8080' + data['logoutUrl'];
      });
  }

  getLogoutUrl() {
    return this.http.get(this.logoutUrl);
  }
}
