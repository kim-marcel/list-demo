import {Component, OnInit} from '@angular/core';
import {ListService} from '../services/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list: String[];

  constructor(private listService: ListService) {
  }

  ngOnInit() {
  }

  showList() {
    this.listService.getList()
      .subscribe(data => this.list = data['list']);
  }

}
