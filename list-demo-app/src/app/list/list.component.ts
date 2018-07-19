import { Component, Input, OnInit, ɵunv } from '@angular/core';
import { ListService } from '../services/list.service';
import { ActivatedRoute } from '@angular/router';
import { LogoutService } from '../services/logout.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list: String[];

  @Input()
  input: String;

  constructor(private route: ActivatedRoute, private listService: ListService, private logoutService: LogoutService) {
  }

  ngOnInit() {
    this.list = this.route.snapshot.data['listData']['body']['list'];
  }

  onChange(event: any) {
    this.input = event.target.value;
  }

  getList() {
    this.listService.getList()
      .subscribe(
        data => {
          console.log(data);
          if (data.body !== undefined) {
            this.list = data['body']['list'];
          }
        }
      );
  }

  addListEntry() {
    this.listService.addToList(this.input)
      .subscribe(() => {
        this.getList();
        this.input = '';
      });
  }

  logout() {
    this.logoutService.logout();
  }
}
