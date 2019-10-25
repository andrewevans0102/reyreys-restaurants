import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { PopupService } from 'src/app/services/popup/popup.service';
import { PopupModalData } from 'src/app/models/popup-modal-data/popup-modal-data';
import { DatabaseService } from 'src/app/services/database/database.service';
import { User } from 'src/app/models/user/user';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  hidePassword = true;
  createForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });
  popupModalData: PopupModalData;
  uid: string;

  constructor(
    private router: Router,
    private popupService: PopupService,
    private DBService: DatabaseService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.uid = this.authService.getLoggedInUser();
  }

  getEmailErrorMessage() {
    return this.createForm.controls.email.hasError('required')
      ? 'You must enter a value'
      : this.createForm.controls.email.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  async createAccount() {
    try {
      await this.authService.createUserWithEmailAndPassword(
        this.createForm.controls.email.value,
        this.createForm.controls.password.value
      );
    } catch (error) {
      this.popupService.errorPopup(error.message);
      return;
    }

    const user: User = {
      uid: this.uid,
      firstName: this.createForm.controls.firstName.value,
      lastName: this.createForm.controls.lastName.value,
      email: this.createForm.controls.email.value
    };

    try {
      await this.DBService.addUser(user);
    } catch (error) {
      this.popupService.errorPopup(error.message);
      return;
    }

    this.popupService.infoPopup('Successful Registration!');
    this.router.navigateByUrl('/content-menu');
  }

  cancel() {
    this.router.navigateByUrl('/home');
  }
}
