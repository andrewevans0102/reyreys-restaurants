import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database/database.service';
import { BtRestaurant } from 'src/app/models/bt-restaurant/bt-restaurant';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { PopupService } from 'src/app/services/popup/popup.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { FormGroup, FormControl } from '@angular/forms';
import { PopupModalData } from 'src/app/models/popup-modal-data/popup-modal-data';

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

  autoTicks = false;
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

  hidePassword = true;
  promoteForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    location: new FormControl(''),
    link: new FormControl(''),
    stars: new FormControl(''),
    review: new FormControl('')
  });
  popupModalData: PopupModalData;

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
      this.promoteForm.controls.name.setValue(wgRestaurant.name);
      this.promoteForm.controls.link.setValue(wgRestaurant.link);
      this.promoteForm.controls.description.setValue(wgRestaurant.description);
    } catch (error) {
      this.popupService.errorPopup(error.message);
      return;
    }
  }

  async save() {
    try {
      // delete from wg table
      await this.DBService.deleteWgRestaurant(this.wgRestaurantId, this.uid);

      // add to bt table
      const promotedRestaurant: BtRestaurant = {
        id: this.wgRestaurantId,
        uid: this.uid,
        name: this.promoteForm.controls.name.value,
        description: this.promoteForm.controls.description.value,
        location: this.promoteForm.controls.location.value,
        link: this.promoteForm.controls.link.value,
        stars: this.promoteForm.controls.stars.value,
        review: this.promoteForm.controls.review.value,
        recorded: null
      };
      await this.DBService.saveBtRestaurant(promotedRestaurant);
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
