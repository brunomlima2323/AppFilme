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
  pagina = 1;
  constructor(public servidor: ServidorProviderService, private router: Router) {
    this.verificarLogado();
  }

  carregarMaisFilmes(){
    console.log(this.pagina);
    this.pagina = ++this.pagina;
    this.retornarFilmes();
  }

  detalhesFilme(filme){
    console.log(filme);
    this.router.navigateByUrl('/detalhes-filme', {
      state: { filme: filme }
    })
  }

  verificarLogado(){
    this.logado = this.servidor.verificaLogado();
    console.log(this.logado);
    if(this.logado != "sim"){
      this.router.navigate(['login']);
    }else{
      this.retornarFilmes();
    }
  }

  deslogar(){
    console.log("deslogando...");
    localStorage.setItem('logado', 'nao');
    this.router.navigate(['login']);
  }

  retornarFilmes(){
    console.log(this.pagina);
    this.servidor.getFilmes(this.pagina).subscribe(data =>{
      data = JSON.parse((data as any)._body);
      if(this.pagina == 1){
        this.lista_filmes = data['results'];
        console.log(this.lista_filmes);
      }else{
        this.lista_filmes = this.lista_filmes.concat(data['results']);
        console.log(this.lista_filmes);
      }
    }, error =>{
      console.log(error);
    });
  }
}
