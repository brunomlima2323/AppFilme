import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServidorProviderService } from '../servidor-provider.service';

@Component({
  selector: 'app-detalhes-filme',
  templateUrl: './detalhes-filme.page.html',
  styleUrls: ['./detalhes-filme.page.scss'],
})
export class DetalhesFilmePage {
  filme: any;
  lista_filmes: any;
  filme_favoritado: string = "heart-empty";
  constructor(private route: ActivatedRoute, private router: Router, private servidor: ServidorProviderService) { 
    this.filme = (this.router.getCurrentNavigation().extras.state as any).filme;
    console.log(this.filme);
    this.retornaFilmesFavoritos();
  }

  favoritarFilme(){
    if(this.filme_favoritado == "heart"){
      this.filme_favoritado = "heart-empty";
      console.log(this.filme_favoritado);
    }else{
      this.filme_favoritado = "heart";
      console.log(this.filme_favoritado);
    }
    console.log(this.filme);
    let usuario_id = localStorage.getItem('id_usuario');
    return this.servidor.favoritarFilme(usuario_id, this.filme.id).subscribe(data =>{
      console.log(data);
      let retorno = (data as any)._body;
      console.log(retorno);
    }, error =>{
      console.log(error);
    });
  }

  retornaFilmesFavoritos(){
    let id_usuario = localStorage.getItem('id_usuario');
    this.servidor.getFilmesFavoritos(id_usuario).subscribe(data =>{
      this.lista_filmes = JSON.parse((data as any)._body);
      console.log(this.lista_filmes);
      this.filme_favoritado = "heart-empty";
      for(let f of this.lista_filmes){
        if(f.id == this.filme.id){
          this.filme_favoritado = "heart";
        } 
      }
      console.log(this.filme_favoritado);
    }, error =>{
      console.log(error);
    });
  }



}
