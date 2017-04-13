import { Component } from '@angular/core';
import { NavController, ModalController} from 'ionic-angular';
import { PostAdd } from '../post-add/post-add';
import { UserDetail } from '../user-detail/user-detail';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private modalCtr: ModalController) {

  }

 redirectPostAddPage() {
  let postAdd = this.modalCtr.create(PostAdd);
  postAdd.present();
 }
 
 redireUserDetail() {
   let postAdd = this.modalCtr.create(UserDetail);
   postAdd.present();
 }
}
