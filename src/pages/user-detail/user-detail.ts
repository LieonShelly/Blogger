import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Login } from '../login/login';

/**
 * Generated class for the UserDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html',
})
export class UserDetail {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtr: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetail');
  }

 logout() {
  this.navCtrl.setRoot(Login)
 }

 back() {
  this.viewCtr.dismiss();
 }
}
