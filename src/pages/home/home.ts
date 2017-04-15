import { Component } from '@angular/core';
import { NavController, ModalController} from 'ionic-angular';
import { PostAdd } from '../post-add/post-add';
import { UserDetail } from '../user-detail/user-detail';
import { PostsService } from '../../providers/posts-service';
import * as firebase from 'firebase';
import { UserService } from '../../providers/user-service';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [PostsService, UserService]
})
export class HomePage {
  private userPostsLists = [];
  private userId: any;
  private userDisplayName: any;
  private userEmail: any;
  private userphoto: any;

  constructor(public navCtrl: NavController,
  private modalCtr: ModalController,
  private postsService: PostsService,
  private userService: UserService) {
    this.userId = firebase.auth().currentUser.uid;
  }

  ionViewDidEnter() {
  this.listPosts();
 }

 redirectPostAddPage() {
  let postAdd = this.modalCtr.create(PostAdd);
  postAdd.present();
 }
 
 redireUserDetail() {
   let postAdd = this.modalCtr.create(UserDetail);
   postAdd.present();
 }

 listPosts() {
   var that = this;
   this.postsService.listPosts().then(snapshot => {
      let posts = snapshot;
      that.userPostsLists.length = 0;
      posts.forEach(post => { 
        that.userPostsLists.push(post.val());
        let userId = post.val().uid;
        that.userService.viewUser(userId).then(user => {
           that.userDisplayName = user.val().email;
        });
      });
   })
 }
}
