import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services';
import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list: any[];
  input: String;

  constructor(private authService: AuthService, private listService: ListService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.list = this.route.snapshot.data['listData']['body'].reverse();
  }

  getList() {
    this.listService.getList()
      .subscribe(
        data => {
          if (data.body !== undefined) {
            this.list = data['body'].reverse();
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

  deleteListEntry(listElementId: string) {
    this.listService.deleteFromList(listElementId)
      .subscribe(() => {
        this.getList();
      });
  }
}
