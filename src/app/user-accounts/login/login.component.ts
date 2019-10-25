import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { PopupService } from 'src/app/services/popup/popup.service';
import { PopupModalData } from 'src/app/models/popup-modal-data/popup-modal-data';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('')
  });

  constructor(
    private router: Router,
    private popupService: PopupService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {}

  async login() {
    try {
      await this.authService.signInWithEmailAndPassword(
        this.loginForm.controls.email.value,
        this.loginForm.controls.password.value
      );
      this.router.navigateByUrl('/menu');
    } catch (error) {
      this.errorPopup(error.message);
      return;
    }
  }

  getEmailErrorMessage() {
    return this.loginForm.controls.email.hasError('required')
      ? 'You must enter a value'
      : this.loginForm.controls.email.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  cancel() {
    this.router.navigateByUrl('/home');
  }

  errorPopup(message: string) {
    const popupModalData: PopupModalData = {
      warn: message,
      info: null
    };
    return this.popupService.openDialog(popupModalData);
  }
}
