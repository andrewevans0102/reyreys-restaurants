import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WgPromoteComponent } from './wg-promote.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import 'hammerjs';

describe('WgPromoteComponent', () => {
  let component: WgPromoteComponent;
  let fixture: ComponentFixture<WgPromoteComponent>;

  const firestoreStub = {
    collection: (name: string) => ({
      valueChanges: () => new BehaviorSubject([]),
      doc: (id: string) => ({
        valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
        set: (d: any) => new Promise((resolve, reject) => resolve())
      })
    })
  };

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
      signOut: jasmine.createSpy('signOut').and.callFake(fakeSignOutHandler),
      currentUser: jasmine.createSpy('currentUser').and.returnValue(userMock)
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [WgPromoteComponent],
      providers: [
        { provide: AngularFirestore, useValue: firestoreStub },
        { provide: AngularFireAuth, useValue: angularFireAuthStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WgPromoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
