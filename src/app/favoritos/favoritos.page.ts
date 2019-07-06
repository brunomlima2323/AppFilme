import { Component, OnInit } from '@angular/core';
import { ServidorProviderService } from '../servidor-provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {
  lista_filmes: any;
  filmes: any = [];
  constructor(private servidor: ServidorProviderService, private router: Router) { }

  ngOnInit() {
    this.retornaFilmesFavoritos();
  }

  desfavoritarFilme(filme_id){
    let usuario_id = localStorage.getItem('id_usuario');
    return this.servidor.favoritarFilme(usuario_id, filme_id).subscribe(data =>{
      console.log(data);
      let retorno = (data as any)._body;
      console.log(retorno);
      this.filmes = [];
      this.retornaFilmesFavoritos();
    }, error =>{
      console.log(error);
    });
  }

  retornaFilmesFavoritos(){
    let id_usuario = localStorage.getItem('id_usuario');
    this.servidor.getFilmesFavoritos(id_usuario).subscribe(data =>{
      this.lista_filmes = JSON.parse((data as any)._body);
      console.log(this.lista_filmes);
      for(let filme of this.lista_filmes){
        console.log(filme.id);
        this.servidor.getFilme(filme.id).subscribe(data =>{
          data = JSON.parse((data as any)._body);
          console.log(data);
          this.filmes.push(data);
        }, error =>{
          console.log(error);
        });
      }
    }, error =>{
      console.log(error);
    });
    console.log(this.filmes);
  }

  detalhesFilme(filme){
    console.log(filme);
    this.router.navigateByUrl('/detalhes-filme', {
      state: { filme: filme }
    })
  }

}
