import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/services/popup/popup.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { WgRestaurant } from 'src/app/models/wg-restaurant/wg-restaurant';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-wg-view',
  templateUrl: './wg-view.component.html',
  styleUrls: ['./wg-view.component.scss']
})
export class WgViewComponent implements OnInit {
  wgRestaurants: Observable<any>;
  uid: string;

  constructor(
    private router: Router,
    private popupService: PopupService,
    private DBService: DatabaseService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.uid = this.authService.getLoggedInUser();
    this.wgRestaurants = this.DBService.getWgRestaurantCollection(this.uid);
  }

  create() {
    this.router.navigateByUrl('/wg-create');
  }

  async delete(id: string) {
    try {
      await this.DBService.deleteWgRestaurant(id, this.uid);
    } catch (error) {
      this.popupService.errorPopup(error.message);
      return;
    }

    this.popupService.infoPopup('delete successful');
  }

  back() {
    this.router.navigateByUrl('/menu');
  }

  promote(wgRestaurant: WgRestaurant) {
    this.router.navigateByUrl(`/wg-promote/${wgRestaurant.id}`);
  }
}
