import { Component, Input, OnInit } from '@angular/core';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from '../../services';

@Component({
  selector: 'app-verify-email-page',
  templateUrl: './verify-email-page.component.html',
  styleUrls: ['./verify-email-page.component.css']
})
export class VerifyEmailPageComponent implements OnInit {

  @Input()
  $user: Observable<User>;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  resendVerificationEmail() {
    console.log('Resending Email verification');
  }
}
