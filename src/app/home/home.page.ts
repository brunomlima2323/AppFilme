import { Component } from '@angular/core';
import { ServidorProviderService } from '../servidor-provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  contatos: any;
  lista_filmes: any;
  logado: any;
  constructor(public servidor: ServidorProviderService, private router: Router) {
    this.verificarLogado();
    this.retornarFilmes();
  }

  verificarLogado(){
    this.logado = this.servidor.verificaLogado();
    console.log(this.logado);
    if(this.logado != "sim"){
      this.router.navigate(['login']);
    }
  }

  deslogar(){
    console.log("deslogando...");
    localStorage.setItem('logado', 'nao');
    this.router.navigate(['login']);
  }

  retornarFilmes(){
    this.servidor.getFilmes().subscribe(data =>{
      data = JSON.parse((data as any)._body);
      this.lista_filmes = data['results'];
      console.log(this.lista_filmes);
    }, error =>{
      console.log(error);
    });
  }
}
