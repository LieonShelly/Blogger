import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { HomePage } from '../home/home';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UserService]
})
export class Login {
  // 属性要设置为any类型，否则不能被识别
  public username: any;
  public password: any;
  public users: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService, 
  public alterCtr: AlertController, private loadCtr: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
    this.listUsers();
  }

  loginAction() {
    this.userService.signInUser(this.username, this.password).then(authdata => {
      this.navCtrl.setRoot(HomePage);
    }).catch(error => {
      let alert = this.alterCtr.create({
        title: 'Error logging in',
        subTitle: error.message,
        buttons: [
          {
           text: 'OK',
           handler: () => {
             loader.dismiss();
           }

          }],
      });
      alert.present()
    });
    let loader =  this.loadCtr.create({
      dismissOnPageChange: true
    });
    loader.present();
  }

  siginUp() {
    this.userService.signUpUser(this.username, this.password).then(data => {
      this.navCtrl.setRoot(HomePage);
    }).catch (error => {
      let alert = this.alterCtr.create({
	      title: 'Error siginUp in',
	      subTitle: error.message,
	      buttons: [{
           text: 'OK',
           handler: () => {
           loader.dismiss();
           }

          }]
	    });
	    alert.present();
    });

    let loader =  this.loadCtr.create({
      dismissOnPageChange: true,
    });
    loader.present();
 }

  listUsers() {
    this.userService.getUsers(5).then(data => {
      this.users = data;
    });
  }
}
