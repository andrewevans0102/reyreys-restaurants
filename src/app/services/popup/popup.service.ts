import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PopupModalComponent } from '../../popup-modal/popup-modal.component';
import { PopupModalData } from '../../models/popup-modal-data/popup-modal-data';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  constructor(private dialog: MatDialog) {}

  openDialog(popupModalData: PopupModalData): void {
    this.dialog.open(PopupModalComponent, {
      width: '50em',
      data: { warn: popupModalData.warn, info: popupModalData.info }
    });
  }

  errorPopup(message: string) {
    const popupModalData = {
      warn: message,
      info: null
    };
    return this.openDialog(popupModalData);
  }

  infoPopup(message: string) {
    const popupModalData: PopupModalData = {
      warn: null,
      info: message
    };
    return this.openDialog(popupModalData);
  }
}
