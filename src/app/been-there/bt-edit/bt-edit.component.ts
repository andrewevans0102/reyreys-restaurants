import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database/database.service';
import { PopupService } from 'src/app/services/popup/popup.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BtRestaurant } from 'src/app/models/bt-restaurant/bt-restaurant';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

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
  btRestaurant = new BtRestaurant();
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
      this.btRestaurant = await this.DBService.getBtRestaurant(id, uid);
    } catch (error) {
      this.popupService.errorPopup(error.message);
      return;
    }
  }

  async save() {
    try {
      await this.DBService.updateBtRestaurant(this.btRestaurant, this.uid);
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
