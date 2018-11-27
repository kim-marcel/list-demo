import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) {
  }

  listUrl = environment.apiHost + '/lists';

  getList(): Observable<HttpResponse<any>> {
    return this.http.get(this.listUrl, {observe: 'response'});
  }

  addToList(listElement): Observable<any> {
    return this.http.post(this.listUrl, {action: 'add', input: listElement});
  }

  deleteFromList(listElementId): Observable<any> {
    return this.http.post(this.listUrl, {action: 'delete', id: listElementId});
  }

}
