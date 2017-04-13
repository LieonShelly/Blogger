import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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
})
export class PostAdd {
  public postBody: any;

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public viewCtr: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostAdd');
  }

  cancle() {
    this.viewCtr.dismiss();
  }

  addNewPost() {
    
  }
}
