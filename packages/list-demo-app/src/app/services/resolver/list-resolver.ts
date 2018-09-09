import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ListService } from '../list.service';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListResolver implements Resolve<Observable<HttpResponse<String>>> {

  constructor(private listService: ListService) {
  }

  resolve(): Observable<HttpResponse<String>> {
    return this.listService.getList();
  }

}
