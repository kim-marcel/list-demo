import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) {
  }

  listUrl = 'http://localhost:8080/list';

  getList() {
    return this.http.get(this.listUrl, {withCredentials: true});
  }

  addToList(listElement) {
    return this.http.post(this.listUrl, {input: listElement}, {withCredentials: true})
      .pipe();
  }

}
