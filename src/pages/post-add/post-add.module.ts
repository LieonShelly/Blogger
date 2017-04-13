import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostAdd } from './post-add';

@NgModule({
  declarations: [
    PostAdd,
  ],
  imports: [
    IonicPageModule.forChild(PostAdd),
  ],
  exports: [
    PostAdd
  ]
})
export class PostAddModule {}
