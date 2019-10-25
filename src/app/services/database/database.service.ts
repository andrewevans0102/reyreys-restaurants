import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { WgRestaurant } from 'src/app/models/wg-restaurant/wg-restaurant';
import { BtRestaurant } from 'src/app/models/bt-restaurant/bt-restaurant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private afs: AngularFirestore) {}

  /**
   * creates user in firestore database
   * @param user, user to be created
   */
  async addUser(user: User) {
    await this.afs
      .collection('users')
      .doc(user.uid)
      .set(user)
      .catch(error => {
        throw error;
      });
  }

  /**
   * create a wanna-go restaurant
   * @param wgRestaurant, restaurant
   * @param uid, uid of user saving the restaurant
   */
  async saveWgRestaurant(wgRestaurant: WgRestaurant, uid: string) {
    const save = {
      uid,
      id: this.afs.createId(),
      recorded: Date.now(),
      name: wgRestaurant.name,
      link: wgRestaurant.link,
      description: wgRestaurant.description
    };

    await this.afs
      .doc(`users/${uid}`)
      .collection('restaurants_wg')
      .doc(save.id)
      .set(save)
      .catch(error => {
        throw error;
      });
  }

  /**
   * delete wanna-go restaurant
   * @param id. id of restaurant to delete
   * @param uid, uid of user who owns restaurant value
   */
  async deleteWgRestaurant(id: string, uid: string) {
    await this.afs
      .doc(`users/${uid}`)
      .collection('restaurants_wg')
      .doc(id)
      .delete()
      .catch(error => {
        throw error;
      });
  }

  /**
   * get wanna-go restaurant
   * @param id, id of restaurant to retrieve
   * @param uid, uid of user who owns the restaurant value
   */
  async getWgRestaurant(id: string, uid: string) {
    return await this.afs
      .doc(`users/${uid}`)
      .collection('restaurants_wg')
      .ref.doc(id)
      .get()
      .then(documentSnapshot => {
        const wgRestaurant = {
          id: documentSnapshot.data().id,
          uid: documentSnapshot.data().uid,
          name: documentSnapshot.data().name,
          link: documentSnapshot.data().link,
          description: documentSnapshot.data().description,
          recorded: documentSnapshot.data().recorded
        };
        return wgRestaurant;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * save been-there restaurant
   * @param bgRestaurant, restaurant
   * @param uid, uid of user saving restaurant
   */
  async saveBtRestaurant(bgRestaurant: BtRestaurant, uid: string) {
    console.log(bgRestaurant.stars);
    const save = {
      id: this.afs.createId(),
      uid,
      name: bgRestaurant.name,
      description: bgRestaurant.description,
      location: bgRestaurant.location,
      link: bgRestaurant.link,
      stars: bgRestaurant.stars,
      review: bgRestaurant.review,
      recorded: Date.now()
    };

    await this.afs
      .doc(`users/${uid}`)
      .collection('restaurants_bt')
      .doc(save.id)
      .set(save)
      .catch(error => {
        throw error;
      });
  }

  /**
   * update been-there restaurant
   * @param btRestaurant, restaurant
   * @param uid, uid of person that owns the restaurant value
   */
  async updateBtRestaurant(btRestaurant: BtRestaurant, uid: string) {
    const save = {
      id: btRestaurant.id,
      uid: btRestaurant.uid,
      name: btRestaurant.name,
      description: btRestaurant.description,
      location: btRestaurant.location,
      link: btRestaurant.link,
      stars: btRestaurant.stars,
      review: btRestaurant.review,
      recorded: btRestaurant.recorded
    };

    await this.afs
      .doc(`users/${uid}`)
      .collection('restaurants_bt')
      .doc(save.id)
      .set(save)
      .catch(error => {
        throw error;
      });
  }

  /**
   * delete been-there restaurant
   * @param id, id of restaurant value
   * @param uid, uid of person that owns the restaurant value
   */
  async deleteBtRestaurant(id: string, uid: string) {
    await this.afs
      .doc(`users/${uid}`)
      .collection('restaurants_bt')
      .doc(id)
      .delete()
      .catch(error => {
        throw error;
      });
  }

  /**
   * get been-there restaurant
   * @param id, id of restaurant to retrieve
   * @param uid, uid of person that owns the restaurant value
   */
  async getBtRestaurant(id: string, uid: string) {
    return await this.afs
      .doc(`users/${uid}`)
      .collection('restaurants_bt')
      .ref.doc(id)
      .get()
      .then(documentSnapshot => {
        const btRestaurant = {
          id: documentSnapshot.data().id,
          uid: documentSnapshot.data().uid,
          name: documentSnapshot.data().name,
          description: documentSnapshot.data().description,
          location: documentSnapshot.data().location,
          link: documentSnapshot.data().link,
          stars: documentSnapshot.data().stars,
          review: documentSnapshot.data().review,
          recorded: documentSnapshot.data().recorded
        };
        return btRestaurant;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * returns an observable representation of the been-there restaurants for a user
   * @param uid, uid of the person to retrieve the restaurants for
   */
  getBtRestaurantCollection(uid: string) {
    return this.afs
      .collection(`users/${uid}/restaurants_bt`, ref => {
        let query:
          | firebase.firestore.CollectionReference
          | firebase.firestore.Query = ref;
        query = query.orderBy('name');
        return query;
      })
      .valueChanges();
  }

  /**
   * returns an observable representation of the wanna-go restaurants for a user
   * @param uid, uid of the person to retrieve the restaurants for
   */
  getWgRestaurantCollection(uid: string) {
    return this.afs
      .collection(`users/${uid}/restaurants_wg`, ref => {
        let query:
          | firebase.firestore.CollectionReference
          | firebase.firestore.Query = ref;
        query = query.orderBy('name');
        return query;
      })
      .valueChanges();
  }
}
