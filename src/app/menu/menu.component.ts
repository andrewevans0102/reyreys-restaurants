import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from '../services/popup/popup.service';
import { PopupModalData } from '../models/popup-modal-data/popup-modal-data';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private popupService: PopupService
  ) {}

  ngOnInit() {}

  goToWannaGo() {
    this.router.navigateByUrl('/wg-view');
  }

  goToBeenThere() {
    this.router.navigateByUrl('/bt-view');
  }

  async logout() {
    try {
      this.authService.logout();
    } catch (error) {
      this.errorPopup(error.message);
      return;
    }

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
