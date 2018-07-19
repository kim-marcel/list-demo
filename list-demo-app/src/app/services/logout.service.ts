import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http: HttpClient) { }

  logoutUrl = this.getAPIHostURL() + '/logout';

  logout() {
    this.getLogoutUrl()
      .subscribe(data => {
        document.location.href = this.getHostURL() + data['logoutUrl'];
      });
  }

  getLogoutUrl() {
    return this.http.get(this.logoutUrl);
  }

  getAPIHostURL(): string {
    return environment.apiHost;
  }

  getHostURL(): string {
    return environment.host;
  }

}
