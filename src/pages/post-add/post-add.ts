import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController,
AlertController } from 'ionic-angular';
import {  PostsService } from '../../providers/posts-service';
import * as firebase from 'firebase';

/**
 * Generated class for the PostAdd page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-post-add',
  templateUrl: 'post-add.html',
  providers: [PostsService]
})
export class PostAdd {
  public postBody: any;
  private userId: any;

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public viewCtr: ViewController,
   private loadCtr: LoadingController,
   private postsService: PostsService,
   private alertCtrl: AlertController ) {
     this.userId = firebase.auth().currentUser.uid;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostAdd');
  }

  cancle() {
    this.viewCtr.dismiss();
  }

  addNewPost() {
    let loading = this.loadCtr.create({
      dismissOnPageChange: true,
      content: 'Reseting your password...'
    });
    loading.present();
    this.postsService.createPostServie(this.userId, this.postBody).then(() => {
      this.postBody = "";
      loading.dismiss().then(() => {
        let alert = this.alertCtrl.create({
          title: 'Done!',
          subTitle: 'Posts successful',
          buttons: ['OK']
        });
        alert.present();
      }).catch(err => {
        loading.dismiss().then(() => {
          let alert = this.alertCtrl.create({
          title: 'Done!',
          subTitle: err.message,
          buttons: ['OK']
        });
        alert.present();
        });
      });
    });
  }
}
