import { TestBed } from '@angular/core/testing';
import { PopupService } from './popup.service';
import { MaterialModule } from '../../material/material.module';

describe('PopupService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [MaterialModule]
    })
  );

  it('should be created', () => {
    const service: PopupService = TestBed.get(PopupService);
    expect(service).toBeTruthy();
  });
});
