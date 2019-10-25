import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database/database.service';
import { PopupService } from 'src/app/services/popup/popup.service';
import { Router } from '@angular/router';
import { WgRestaurant } from 'src/app/models/wg-restaurant/wg-restaurant';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-wg-create',
  templateUrl: './wg-create.component.html',
  styleUrls: ['./wg-create.component.scss']
})
export class WgCreateComponent implements OnInit {
  wgRestaurant: WgRestaurant;
  uid: string;

  constructor(
    private DBService: DatabaseService,
    private authService: AuthenticationService,
    private popupService: PopupService,
    private router: Router
  ) {}

  ngOnInit() {
    this.uid = this.authService.getLoggedInUser();
    this.wgRestaurant = new WgRestaurant();
  }

  async save() {
    try {
      await this.DBService.saveWgRestaurant(this.wgRestaurant, this.uid);
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
