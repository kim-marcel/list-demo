import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  loginUrl = this.getAPIHostURL() + '/login';

  login() {
    this.getLoginUrl()
      .subscribe(data => {
        document.location.href = this.getHostURL() + data['loginUrl'];
      });
  }

  getLoginUrl() {
    return this.http.get(this.loginUrl);
  }

  getAPIHostURL(): string {
    return environment.apiHost;
  }

  getHostURL(): string {
    return environment.host;
  }
}
