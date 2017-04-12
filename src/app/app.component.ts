import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { Login } from '../pages/login/login';
import * as firebase from 'firebase'
@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage:any = Login;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    var config = {
    apiKey: "AIzaSyA_8d8vGlG_XT7w3sUZBDs0DeipDxGw2wU",
    authDomain: "uber-rider-7dafd.firebaseapp.com",
    databaseURL: "https://uber-rider-7dafd.firebaseio.com",
    projectId: "uber-rider-7dafd",
    storageBucket: "uber-rider-7dafd.appspot.com",
    messagingSenderId: "519996771455"
  };
  firebase.initializeApp(config);

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    let user = firebase.auth().currentUser;
    if(user){
      this.rootPage = TabsPage;
    } else {
      this.rootPage = Login;
    }
  }
}
