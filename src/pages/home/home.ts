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
  private userList = [];

  constructor(public navCtrl: NavController,
  private modalCtr: ModalController,
  private postsService: PostsService,
  private userService: UserService) {
    this.userId = firebase.auth().currentUser.uid;
    this.listPosts()
  }


 redirectPostAddPage() {
  let postAdd = this.modalCtr.create(PostAdd);
  postAdd.onWillDismiss(() => {
    this.listPosts();
    
  })
  postAdd.present();
 }
 
 redireUserDetail() {
   let postAdd = this.modalCtr.create(UserDetail);
   postAdd.present();
 }

 listPosts() {
   var that = this;
  this.userPostsLists = [];
   this.postsService.listPosts().then(snapshot => {
      let posts = snapshot;
      posts.forEach(post => { 
        let userId = post.val().uid;
        that.userService.viewUser(userId).then(user => {
           let userDisplayName = user.val().email;
           let userphoto = user.val().photo;
           let newPost = new PostInfo(userDisplayName, userphoto, post.val());
           that.userPostsLists.push(newPost);
           console.log('userDisplayName' + userDisplayName + ":" + post.val().body);
        });
      });
   })
 }
}
 
class PostInfo {
  public username:any;
  public userPhoto: any;
  public post: any;

  constructor(name: any, photo: any, post: any) {
    this.username = name;
    this.userPhoto = photo;
    this.post = post;
}

}
