import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database/database.service';
import { PopupService } from 'src/app/services/popup/popup.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BtRestaurant } from 'src/app/models/bt-restaurant/bt-restaurant';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { FormGroup, FormControl } from '@angular/forms';
import { PopupModalData } from 'src/app/models/popup-modal-data/popup-modal-data';

@Component({
  selector: 'app-bt-edit',
  templateUrl: './bt-edit.component.html',
  styleUrls: ['./bt-edit.component.scss']
})
export class BtEditComponent implements OnInit {
  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(value) {
    this._tickInterval = coerceNumberProperty(value);
  }

  btRestaurantId: string;
  btRestaurantRecorded: number;
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
  editForm = new FormGroup({
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
    private DBService: DatabaseService,
    private authService: AuthenticationService,
    private popupService: PopupService,
    private router: Router
  ) {}

  ngOnInit() {
    this.uid = this.authService.getLoggedInUser();
    this.btRestaurantId = this.route.snapshot.paramMap.get('id');
    this.getRestaurant(this.btRestaurantId, this.uid);
  }

  async getRestaurant(id: string, uid: string) {
    try {
      const btRestaurant = await this.DBService.getBtRestaurant(id, uid);
      this.editForm.controls.name.setValue(btRestaurant.name);
      this.editForm.controls.description.setValue(btRestaurant.description);
      this.editForm.controls.location.setValue(btRestaurant.location);
      this.editForm.controls.link.setValue(btRestaurant.link);
      this.editForm.controls.stars.setValue(btRestaurant.stars);
      this.editForm.controls.review.setValue(btRestaurant.review);
      // store the recorded date for historical purposes
      this.btRestaurantRecorded = btRestaurant.recorded;
    } catch (error) {
      this.popupService.errorPopup(error.message);
      return;
    }
  }

  async save() {
    try {
      const btRestaurant: BtRestaurant = {
        id: this.btRestaurantId,
        uid: this.uid,
        name: this.editForm.controls.name.value,
        description: this.editForm.controls.description.value,
        location: this.editForm.controls.location.value,
        link: this.editForm.controls.link.value,
        stars: this.editForm.controls.stars.value,
        review: this.editForm.controls.review.value,
        recorded: this.btRestaurantRecorded
      };
      await this.DBService.updateBtRestaurant(btRestaurant);
    } catch (error) {
      this.popupService.errorPopup(error.message);
      return;
    }

    this.popupService.infoPopup('save successful');
    this.router.navigateByUrl('/bt-view');
  }

  cancel() {
    this.router.navigateByUrl('/bt-view');
  }
}
