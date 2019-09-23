import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EmotiondetectionPage } from './emotiondetection.page';

const routes: Routes = [
  {
    path: '',
    component: EmotiondetectionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EmotiondetectionPage]
})
export class EmotiondetectionPageModule {}
