import { TestBed } from '@angular/core/testing';
import { DatabaseService } from './database.service';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

describe('DatabaseService', () => {
  const firestoreStub = {
    collection: (name: string) => ({
      doc: (id: string) => ({
        valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
        set: (d: any) => new Promise((resolve, reject) => resolve())
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
});
