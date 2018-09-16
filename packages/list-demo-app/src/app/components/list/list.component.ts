import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services';
import { Component, Input, OnInit } from '@angular/core';
import { ListService } from '../../services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list: any[];

  @Input()
  input: String;

  constructor(private authService: AuthService, private listService: ListService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.list = this.route.snapshot.data['listData']['body'].reverse();
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
