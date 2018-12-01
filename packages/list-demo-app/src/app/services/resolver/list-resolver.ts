import { AuthService } from '../auth.service';
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { List } from '../../models';
import { ListService } from '../list.service';
import { Observable } from 'rxjs';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ListResolver implements Resolve<Observable<HttpResponse<List>>> {

  constructor(private authService: AuthService, private listService: ListService) {
  }

  // TODO: remove resolver
  resolve(): Observable<HttpResponse<List>> {
    return null; // this.listService.getList(this.authService.getUserId());
  }

}
