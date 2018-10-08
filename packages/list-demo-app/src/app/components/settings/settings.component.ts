import { AuthProviderId } from '../../enums';
import { AuthService } from '../../services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  isLoggedInWithEmail() {
    return this.authService.getProviderId() === AuthProviderId.EMAIL;
  }

}
