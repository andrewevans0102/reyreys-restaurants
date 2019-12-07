import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private afAuth: AngularFireAuth) {}

  getLoggedInUser() {
    return this.afAuth.auth.currentUser.uid;
  }

  async createUserWithEmailAndPassword(email: string, password: string) {
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      return res.user.uid;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await this.afAuth.auth.signOut();
    } catch (error) {
      throw error;
    }
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw error;
    }
  }
}
