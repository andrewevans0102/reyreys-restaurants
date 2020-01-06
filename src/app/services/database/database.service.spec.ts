import { TestBed } from '@angular/core/testing';
import { DatabaseService } from './database.service';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { WgRestaurant } from 'src/app/models/wg-restaurant/wg-restaurant';
import { BtRestaurant } from 'src/app/models/bt-restaurant/bt-restaurant';

describe('DatabaseService', () => {
  let service: DatabaseService;
  let savedValues = [];

  const user = {
    uid: 'ABC123',
    firstName: 'first',
    lastName: 'last',
    email: 'abc@123.com'
  };

  const wgRestaurant: WgRestaurant = {
    id: '1234',
    uid: 'abc123',
    name: 'name',
    link: 'link',
    description: 'description',
    recorded: 1234
  };

  const btRestaurant: BtRestaurant = {
    id: '1234',
    uid: '5678',
    name: 'restaurant name',
    description: 'restaurant description',
    location: 'restaurant location',
    link: 'restaurant link',
    stars: 5,
    review: 'restaurant review',
    recorded: 1234
  };

  const fakeAddValueHandler = (value: any): Promise<any> => {
    return Promise.resolve(savedValues.push(value));
  };

  const deleteAddedValueHandler = (): Promise<any> => {
    return Promise.resolve((savedValues = []));
  };

  const firestoreStub = {
    collection: (name: string) => ({
      doc: (id: string) => ({
        valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
        set: (d: any) => fakeAddValueHandler(d)
      })
    }),
    createId: () => {
      return new Promise((resolve, reject) => resolve('1234567890'));
    },
    doc: (idFirst: string) => ({
      collection: (name: string) => ({
        doc: (idSecond: string) => ({
          valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
          set: (d: any) => fakeAddValueHandler(d),
          delete: () => deleteAddedValueHandler()
        })
      })
    })
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFirestore, useValue: firestoreStub }]
    });

    service = TestBed.get(DatabaseService);
  });

  // clear out any saved values
  afterEach(() => (savedValues = []));

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should call add user successfully', async () => {
    await service.addUser(user);
    expect(savedValues.length).toEqual(1);
  });

  test('should call save wgRestaurant successfully', async () => {
    await service.saveWgRestaurant(wgRestaurant);
    expect(savedValues.length).toEqual(1);
  });

  test('should call delete wgRestaurant successfully', async () => {
    await service.saveWgRestaurant(wgRestaurant);
    expect(savedValues.length).toEqual(1);
    await service.deleteWgRestaurant('1234', 'abc123');
    expect(savedValues.length).toEqual(0);
  });

  test('should call save btRestaurant successfully', async () => {
    await service.saveBtRestaurant(btRestaurant);
    expect(savedValues.length).toEqual(1);
  });

  test('should call update btRestaurant successfully', async () => {
    await service.updateBtRestaurant(btRestaurant);
    expect(savedValues.length).toEqual(1);
  });

  test('should call delete btRestaurant successfully', async () => {
    await service.saveBtRestaurant(btRestaurant);
    expect(savedValues.length).toEqual(1);
    await service.deleteBtRestaurant('1234', 'abc123');
    expect(savedValues.length).toEqual(0);
  });
});
