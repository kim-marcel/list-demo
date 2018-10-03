import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services';
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
    this.list = this.route.snapshot.data['listData']['body'].reverse();
  }

  getList() {
    this.listService.getList()
      .subscribe(
        (data) => {
          if (data.body) {
            this.list = data['body'].reverse();
          }
        });
  }

  addListEntry() {
    this.listService.addToList(this.addListElementForm.value.listInput)
      .subscribe(() => {
        this.getList();
        this.initializeForm();
      });
  }

  deleteListEntry(listElementId: string) {
    this.listService.deleteFromList(listElementId)
      .subscribe(() => {
        this.getList();
      });
  }
}
