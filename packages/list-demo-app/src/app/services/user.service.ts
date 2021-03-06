import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  userUrl = environment.apiHost + '/users';

  deleteUserData(userId: string) {
    return this.http.delete(this.userUrl + '/' + userId);
  }

}
