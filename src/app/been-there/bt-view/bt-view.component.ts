import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/services/popup/popup.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-bt-view',
  templateUrl: './bt-view.component.html',
  styleUrls: ['./bt-view.component.scss']
})
export class BtViewComponent implements OnInit {
  restaurants: Observable<any>;
  uid: string;

  constructor(
    private router: Router,
    private popupService: PopupService,
    private authService: AuthenticationService,
    private DBService: DatabaseService
  ) {}

  ngOnInit() {
    this.uid = this.authService.getLoggedInUser();
    this.restaurants = this.DBService.getBtRestaurantCollection(this.uid);
  }

  async delete(id: string) {
    try {
      await this.DBService.deleteBtRestaurant(id, this.uid);
    } catch (error) {
      this.popupService.errorPopup(error.message);
      return;
    }

    this.popupService.infoPopup('delete successful');
  }

  edit(id: string) {
    this.router.navigateByUrl(`/bt-edit/${id}`);
  }

  back() {
    this.router.navigateByUrl('/menu');
  }
}
