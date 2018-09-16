import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient, private errorHandler: ErrorHandler) {
  }

  listUrl = environment.apiHost + '/list';

  getList(): Observable<any> {
    return this.http.get(this.listUrl, {observe: 'response'})
      .pipe(catchError((err) => {
          this.errorHandler.handleError(err);
          return of('Error');
        })
      );
  }

  addToList(listElement) {
    return this.http.post(this.listUrl, {action: 'add', input: listElement});
  }

  deleteFromList(listElementId) {
    return this.http.post(this.listUrl, {action: 'delete', id: listElementId});
  }

}
