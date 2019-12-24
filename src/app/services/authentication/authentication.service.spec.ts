import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

const credentialsMock = {
  email: 'abc@123.com',
  password: 'password'
};

const userMock = {
  uid: 'ABC123',
  email: credentialsMock.email
};

const createUserMock = {
  user: {
    uid: 'ABC123',
    email: credentialsMock.email
  }
};

const fakeAuthState = new BehaviorSubject(null);

const fakeSignInHandler = (email, password): Promise<any> => {
  fakeAuthState.next(userMock);
  return Promise.resolve(userMock);
};

const fakeCreateUserHandler = (email, password): Promise<any> => {
  fakeAuthState.next(createUserMock);
  return Promise.resolve(createUserMock);
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
      .and.callFake(fakeCreateUserHandler),
    signInWithEmailAndPassword: jasmine
      .createSpy('signInWithEmailAndPassword')
      .and.callFake(fakeSignInHandler),
    signOut: jasmine.createSpy('signOut').and.callFake(fakeSignOutHandler)
  }
};

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let afAuth: AngularFireAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFireAuth, useValue: angularFireAuthStub }]
    });

    service = TestBed.get(AuthenticationService);
    afAuth = TestBed.get(AngularFireAuth);
  });

  afterEach(() => {
    fakeAuthState.next(null);
  });

  it('should be created', () => {
    // const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });

  it('should call the create user with email and password successfully', async () => {
    const response = await service.createUserWithEmailAndPassword(
      credentialsMock.email,
      credentialsMock.password
    );
    expect(response).toBe(createUserMock.user.uid);
  });

  it('should call logout successfully', async () => {
    await service.logout();
    expect(service).toBeTruthy();
  });

  it('should call signin successfully', async () => {
    await service.signInWithEmailAndPassword(
      credentialsMock.email,
      credentialsMock.password
    );
    expect(service).toBeTruthy();
  });
});
