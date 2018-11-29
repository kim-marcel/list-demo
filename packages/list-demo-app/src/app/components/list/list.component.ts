import { ActivatedRoute } from '@angular/router';
import { AuthService, ListService, NotificationService } from '../../services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { List } from '../../models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  addListElementForm: FormGroup;
  list: List;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private listService: ListService,
    private notificationService: NotificationService,
    private route: ActivatedRoute) {
  }

  private initializeForm() {
    this.addListElementForm = this.formBuilder.group(
      {
        listInput: ['']
      }
    );
  }

  ngOnInit() {
    this.initializeForm();
    this.list = this.route.snapshot.data.listData.body;
  }

  getList() {
    this.listService.getList(this.authService.getUserId())
      .subscribe(
        (data) => {
          if (data.body) {
            this.list = data.body;
            this.notificationService.reset();
            console.log(this.list);
          }
        });
  }

  addListEntry() {
    this.listService.addToList(this.list.listId, this.addListElementForm.value.listInput)
      .subscribe(() => {
        this.getList();
        this.initializeForm();
      });
  }

  deleteListEntry(listElementId: string) {
    this.listService.deleteFromList(this.list.listId, listElementId)
      .subscribe(() => {
        this.getList();
      });
  }
}
