import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,
ActionSheetController, AlertController } from 'ionic-angular';
import { Login } from '../login/login';
import {  Camera, CameraOptions } from '@ionic-native/camera';
import { UserService } from '../../providers/user-service';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html',
  providers: [Camera, UserService]
})
export class UserDetail {
  private userId: any;
  private userDisplayName: any;
  private userPhotoUrl: any;

  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  public viewCtr: ViewController,
  private camera: Camera,
  private actionShertCtr: ActionSheetController,
  private userService: UserService,
  private alertCtrl: AlertController) {  
    this.userId = firebase.auth().currentUser.uid;
     }


  ionViewDidLoad() {
    console.log('ionViewDidLoad -- userDetail');
    this.userService.viewUser(this.userId).then(snapshotUser => {
         this.userDisplayName = snapshotUser.val().email;
         this.userPhotoUrl = snapshotUser.val().photo;
    });
  }

  logout() {
    
    firebase.auth().signOut().then(() => {
      this.navCtrl.setRoot(Login);
    });
 }

  back() {
  this.viewCtr.dismiss();
  }

  showAlert() {
   let actionSheet = this.actionShertCtr.create({
      buttons: [
        {
          text: 'Ablum',
          handler: () => {
            this.openAblum()
          }
        },
         {
          text: 'Cancle',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  openAblum() {
    var options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
     };
    this.camera.getPicture(options)
     .then((imageData) => {
        return this.userService.uploadAvatar("data:image/jpeg;base64," + imageData, this.userId, 'Images');
       }).catch( error => {
         let alert = this.alertCtrl.create({
          title: 'Error!',
          subTitle: error.message,
          buttons: ['OK']
       });
        alert.present();
       });
  }



}
