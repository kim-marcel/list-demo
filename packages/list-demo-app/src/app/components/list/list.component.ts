import { ActivatedRoute } from '@angular/router';
import { AuthService, NotificationService } from '../../services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ListElement } from '../../models';
import { ListService } from '../../services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  addListElementForm: FormGroup;
  list: ListElement[];

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
    const dataBody = this.route.snapshot.data['listData']['body'];
    this.list = dataBody ? dataBody.reverse() : undefined;
  }

  getList() {
    const httpSubscription = this.listService.getList()
      .subscribe(
        (data) => {
          if (data.body) {
            this.list = data['body'].reverse();
            httpSubscription.unsubscribe();
            this.notificationService.reset();
          }
        });
  }

  addListEntry() {
    const httpSubscription = this.listService.addToList(this.addListElementForm.value.listInput)
      .subscribe(() => {
        this.getList();
        this.initializeForm();
        httpSubscription.unsubscribe();
      });
  }

  deleteListEntry(listElementId: string) {
    const httpSubscription = this.listService.deleteFromList(listElementId)
      .subscribe(() => {
        this.getList();
        httpSubscription.unsubscribe();
      });
  }
}
