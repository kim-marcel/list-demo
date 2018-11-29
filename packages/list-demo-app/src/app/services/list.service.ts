import { environment } from '../../environments/environment';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { List } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) {
  }

  listUrl = environment.apiHost + '/lists';

  getList(userId: string): Observable<HttpResponse<List>> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<List>(this.listUrl, {observe: 'response', params: params});
  }

  addToList(listId: string, listElement: string): Observable<any> {
    return this.http.post(this.listUrl + '/' + listId, {input: listElement});
  }

  deleteFromList(listId, listElementId): Observable<any> {
    return this.http.delete(this.listUrl + '/' + listId + '/' + listElementId);
  }

}
