import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database/database.service';
import { PopupService } from 'src/app/services/popup/popup.service';
import { Router } from '@angular/router';
import { WgRestaurant } from 'src/app/models/wg-restaurant/wg-restaurant';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PopupModalData } from 'src/app/models/popup-modal-data/popup-modal-data';

@Component({
  selector: 'app-wg-create',
  templateUrl: './wg-create.component.html',
  styleUrls: ['./wg-create.component.scss']
})
export class WgCreateComponent implements OnInit {
  hidePassword = true;
  saveForm = new FormGroup({
    name: new FormControl(''),
    link: new FormControl(''),
    description: new FormControl('')
  });
  popupModalData: PopupModalData;

  constructor(
    private DBService: DatabaseService,
    private authService: AuthenticationService,
    private popupService: PopupService,
    private router: Router
  ) {}

  ngOnInit() {}

  async save() {
    try {
      const wgRestaurant: WgRestaurant = {
        id: null,
        uid: this.authService.getLoggedInUser(),
        name: this.saveForm.controls.name.value,
        link: this.saveForm.controls.link.value,
        description: this.saveForm.controls.description.value,
        recorded: null
      };

      await this.DBService.saveWgRestaurant(wgRestaurant);
    } catch (error) {
      this.popupService.errorPopup(error.message);
      return;
    }

    this.popupService.infoPopup('save successful');
    this.router.navigateByUrl('/wg-view');
  }

  cancel() {
    this.router.navigateByUrl('/wg-view');
  }
}
