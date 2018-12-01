import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services';

@Component({
  selector: 'app-verify-email-page',
  templateUrl: './verify-email-page.component.html',
  styleUrls: ['./verify-email-page.component.css']
})
export class VerifyEmailPageComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  resendEmailVerification() {
    this.authService.resendEmailVerification();
  }
}
