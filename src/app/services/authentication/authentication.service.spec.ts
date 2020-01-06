import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject, Subscription } from 'rxjs';
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
    createUserWithEmailAndPassword: (email: string, password: string) =>
      fakeCreateUserHandler(email, password),
    signInWithEmailAndPassword: (email: string, password: string) =>
      fakeSignInHandler(email, password),
    signOut: () => fakeSignOutHandler()
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

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should call the create user with email and password successfully', async () => {
    const response = await service.createUserWithEmailAndPassword(
      credentialsMock.email,
      credentialsMock.password
    );
    expect(response).toBe(createUserMock.user.uid);
  });

  test('should call logout successfully', async () => {
    await service.signInWithEmailAndPassword(
      credentialsMock.email,
      credentialsMock.password
    );
    expect(fakeAuthState.value).toEqual(userMock);
    await service.logout();
    expect(fakeAuthState.value).toEqual(null);
  });

  test('should call signin successfully', async () => {
    await service.signInWithEmailAndPassword(
      credentialsMock.email,
      credentialsMock.password
    );
    expect(fakeAuthState.value).toEqual(userMock);
  });
});
