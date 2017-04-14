import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

/*
  Generated class for the PostsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PostsService {
private data: any;
private userNode: any;
private fireRef: any;
private postNode: any;
private userPostsNode: any;

  constructor(public http: Http) {
    console.log('Hello PostsService Provider');
    this.userNode = firebase.database().ref('blogger_users');
    this.postNode = firebase.database().ref('posts');
    this.userPostsNode = firebase.database().ref('user_posts');
    this.fireRef = firebase.database().ref(); 
 }

 createPostServie(userId: any, postBody: any) {
  var postData = {
    uid: userId,
    body: postBody
  };
  /// 随机生成一个key
  var newPostKey = this.postNode.push().key;

  var updatePath = {};
  updatePath['/posts/' + newPostKey] = postData;
  updatePath['/user-posts/' + userId + "/" + newPostKey] = postBody;
  return this.fireRef.update(updatePath);
 }

  listPosts() {
    return  firebase.database().ref('posts').once('value')
  }
}
