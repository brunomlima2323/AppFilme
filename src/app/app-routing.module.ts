import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

let rota = localStorage.getItem('logado');
if (rota == "sim"){
  console.log("rota: " + rota);
  rota = "home";
}else{
  console.log("rota: " + rota);
  rota = "login";
}
let routes: Routes = [
  {
    path: '',
    redirectTo: rota,
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'detalhes-filme', loadChildren: './detalhes-filme/detalhes-filme.module#DetalhesFilmePageModule' },
  { path: 'cadastro', loadChildren: './cadastro/cadastro.module#CadastroPageModule' },
  { path: 'favoritos', loadChildren: './favoritos/favoritos.module#FavoritosPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
