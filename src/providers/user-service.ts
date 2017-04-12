import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import *as firebase from 'firebase';
/*
  Generated class for the UserService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserService {
public userProfile: any;

  constructor(public http: Http) {
    console.log('Hello UserService Provider');
    this.userProfile = firebase.database().ref('blogger_users');
}
  
  /// 请求数据
  getUsers(num) {
    return new Promise((resolve) => {
        this.http.get('https://randomuser.me/api/?results=' + num)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data.results);
        });
    });
  }

  signUpUser(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then(uer => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(authenticatedUser => {
        this.userProfile.child(authenticatedUser.uid).set({
          email: email,
          password: password
        });
      })
    })
  }

  signInUser(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
}
