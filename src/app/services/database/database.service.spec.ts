import { TestBed } from '@angular/core/testing';
import { DatabaseService } from './database.service';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { WgRestaurant } from 'src/app/models/wg-restaurant/wg-restaurant';
import { BtRestaurant } from 'src/app/models/bt-restaurant/bt-restaurant';

describe('DatabaseService', () => {
  const firestoreStub = {
    collection: (name: string) => ({
      doc: (id: string) => ({
        valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
        set: (d: any) => new Promise((resolve, reject) => resolve())
      })
    }),
    createId: () => {
      return new Promise((resolve, reject) => resolve('1234567890'));
    },
    doc: (idFirst: string) => ({
      collection: (name: string) => ({
        doc: (idSecond: string) => ({
          valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
          set: (d: any) => new Promise((resolve, reject) => resolve()),
          delete: () => new Promise((resolve, reject) => resolve())
        })
      })
    })
  };

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFirestore, useValue: firestoreStub }]
    })
  );

  it('should be created', () => {
    const service: DatabaseService = TestBed.get(DatabaseService);
    expect(service).toBeTruthy();
  });

  it('should call add user successfully', async () => {
    const service: DatabaseService = TestBed.get(DatabaseService);
    const user = {
      uid: 'ABC123',
      firstName: 'first',
      lastName: 'last',
      email: 'abc@123.com'
    };
    await service.addUser(user);
    expect(service).toBeTruthy();
  });

  it('should call save wgRestaurant successfully', async () => {
    const service: DatabaseService = TestBed.get(DatabaseService);
    const wgRestaurant: WgRestaurant = {
      id: '1234',
      uid: 'abc123',
      name: 'name',
      link: 'link',
      description: 'description',
      recorded: 1234
    };
    service.saveWgRestaurant(wgRestaurant);
    expect(service).toBeTruthy();
  });

  it('should call delete wgRestaurant successfully', async () => {
    const service: DatabaseService = TestBed.get(DatabaseService);
    await service.deleteWgRestaurant('1234', 'abc123');
  });

  it('should call save btRestaurant successfully', async () => {
    const service: DatabaseService = TestBed.get(DatabaseService);
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
    await service.saveBtRestaurant(btRestaurant);
  });

  it('should call update btRestaurant successfully', async () => {
    const service: DatabaseService = TestBed.get(DatabaseService);
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
    await service.updateBtRestaurant(btRestaurant);
  });

  it('should call delete btRestaurant successfully', async () => {
    const service: DatabaseService = TestBed.get(DatabaseService);
    await service.deleteBtRestaurant('1234', 'abc123');
  });
});
