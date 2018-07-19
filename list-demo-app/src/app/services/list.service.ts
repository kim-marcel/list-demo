import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient, private router: Router) {
  }

  listUrl = this.getAPIHostURL() + '/list';

  getList(): Observable<any> {
    return this.http.get(this.listUrl, {withCredentials: true, observe: 'response'})
      .pipe(catchError(error => {
        this.handleError(error);
        return of('Error');
      }));
  }

  addToList(listElement) {
    return this.http.post(this.listUrl, {input: listElement}, {withCredentials: true})
      .pipe(catchError(error => {
        this.handleError(error);
        return of('Error');
      }));
  }

  handleError(error) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // Request returned an unsuccessful response code
      if (error.status === 401) {
        console.error('UNAUTHORIZED');
        this.router.navigateByUrl('/login');
      } else {
        console.error(
          `Backend returned code ${error.status}, ` + `body was: ${error.error}`);
      }
    }
  }

  getAPIHostURL(): string {
    return environment.apiHost;
  }

}
