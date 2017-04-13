import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserDetail } from './user-detail';

@NgModule({
  declarations: [
    UserDetail,
  ],
  imports: [
    IonicPageModule.forChild(UserDetail),
  ],
  exports: [
    UserDetail
  ]
})
export class UserDetailModule {}
