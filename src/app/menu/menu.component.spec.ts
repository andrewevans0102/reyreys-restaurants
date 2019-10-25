import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { MaterialModule } from '../material/material.module';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  const credentialsMock = {
    email: 'abc@123.com',
    password: 'password'
  };

  const userMock = {
    uid: 'ABC123',
    email: credentialsMock.email
  };

  const fakeAuthState = new BehaviorSubject(null);

  const fakeSignInHandler = (email, password): Promise<any> => {
    fakeAuthState.next(userMock);
    return Promise.resolve(userMock);
  };

  const fakeSignOutHandler = (): Promise<any> => {
    fakeAuthState.next(null);
    return Promise.resolve();
  };

  const angularFireAuthStub = {
    authState: fakeAuthState,
    auth: {
      createUserWithEmailAndPassword: jasmine
        .createSpy('createUserWithEmailAndPassword')
        .and.callFake(fakeSignInHandler),
      signInWithEmailAndPassword: jasmine
        .createSpy('signInWithEmailAndPassword')
        .and.callFake(fakeSignInHandler),
      signOut: jasmine.createSpy('signOut').and.callFake(fakeSignOutHandler)
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule],
      declarations: [MenuComponent],
      providers: [{ provide: AngularFireAuth, useValue: angularFireAuthStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
