import {Component, Input, OnInit} from '@angular/core';
import {ListService} from '../services/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list: String[];

  @Input()
  input: String;

  constructor(private listService: ListService) {
  }

  ngOnInit() {
  }

  onChange(event: any) {
    this.input = event.target.value;
  }

  showList() {
    this.listService.getList()
      .subscribe(data => this.list = data['list']);
  }

  addListEntry() {
    this.listService.addToList(this.input);
    this.input = '';
  }
}
