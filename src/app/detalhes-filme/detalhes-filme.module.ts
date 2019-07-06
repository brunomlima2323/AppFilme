import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetalhesFilmePage } from './detalhes-filme.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhesFilmePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetalhesFilmePage]
})
export class DetalhesFilmePageModule {}
