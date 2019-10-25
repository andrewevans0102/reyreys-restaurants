import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database/database.service';
import { BtRestaurant } from 'src/app/models/bt-restaurant/bt-restaurant';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { PopupService } from 'src/app/services/popup/popup.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-wg-promote',
  templateUrl: './wg-promote.component.html',
  styleUrls: ['./wg-promote.component.scss']
})
export class WgPromoteComponent implements OnInit {
  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(value) {
    this._tickInterval = coerceNumberProperty(value);
  }
  @Input()
  wgRestaurantId: string;

  promotedRestaurant = new BtRestaurant();
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 5;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = true;
  value = 0;
  vertical = false;
  // tslint:disable-next-line:variable-name
  private _tickInterval = 1;
  uid: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private popupService: PopupService,
    private DBService: DatabaseService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.wgRestaurantId = this.route.snapshot.paramMap.get('id');
    this.getRestaurant(this.wgRestaurantId);
  }

  async getRestaurant(id: string) {
    try {
      this.uid = this.authService.getLoggedInUser();
      const wgRestaurant = await this.DBService.getWgRestaurant(id, this.uid);
      this.promotedRestaurant.uid = wgRestaurant.uid;
      this.promotedRestaurant.id = wgRestaurant.id;
      this.promotedRestaurant.name = wgRestaurant.name;
      this.promotedRestaurant.link = wgRestaurant.link;
      this.promotedRestaurant.description = wgRestaurant.description;
    } catch (error) {
      this.popupService.errorPopup(error.message);
      return;
    }
  }

  async save() {
    // this could be removed if switched to reactive forms
    if (this.promotedRestaurant.name === undefined) {
      this.popupService.errorPopup('restaurant name is required');
      return;
    }
    if (this.promotedRestaurant.description === undefined) {
      this.popupService.errorPopup('restaurant description is required');
      return;
    }
    if (this.promotedRestaurant.location === undefined) {
      this.popupService.errorPopup('restaurant location is requried');
      return;
    }
    if (this.promotedRestaurant.link === undefined) {
      this.popupService.errorPopup('restaurant link is required');
      return;
    }
    if (this.promotedRestaurant.stars === undefined) {
      this.popupService.errorPopup('restaurant stars is required');
      return;
    }
    if (this.promotedRestaurant.review === undefined) {
      this.popupService.errorPopup('restaurant review is required');
      return;
    }

    try {
      // delete from wg table
      await this.DBService.deleteWgRestaurant(this.wgRestaurantId, this.uid);
      // add to bt table
      await this.DBService.saveBtRestaurant(this.promotedRestaurant, this.uid);
      this.popupService.infoPopup('success');
      // navigate to bt view
      this.router.navigateByUrl('/bt-view');
    } catch (error) {
      this.popupService.errorPopup(error.message);
      return;
    }
  }

  cancel() {
    this.router.navigateByUrl('/wg-view');
  }
}
