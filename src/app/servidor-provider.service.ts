import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ServidorProviderService {

  url: string = "https://appfilme.000webhostapp.com/";
  
  constructor(public http: Http) {
    console.log('SeridorProvider');  
  }

  fazerCadastro(campo){
    let postData = new FormData();
    postData.append('usuario', campo.usuario);
    postData.append('senha', campo.senha);
    console.log(campo);
    return this.http.post(this.url+'cadastro.php', postData);
  }

  verificaLogado(){
    return localStorage.getItem("logado");
  }

  enviarLogin(campo){
    console.log(campo);
    let postData = new FormData();
    postData.append('usuario', campo.usuario);
    postData.append('senha', campo.senha);
    console.log(postData);
    return this.http.post(this.url+'login.php', postData);
  }

  getFilmes(pagina = 1){
    console.log(pagina);
    return this.http.get("https://api.themoviedb.org/3/movie/popular?page="+pagina+"&language=pt-BR&api_key=8cfaeaaa6188782fdb202c89bf369a3f");
  }

  getFilme(idfilme){
    return this.http.get("https://api.themoviedb.org/3/movie/"+idfilme+"?language=pt-BR&api_key=8cfaeaaa6188782fdb202c89bf369a3f");
  }

  favoritarFilme(usuario_id, filme_id){
    let postData = new FormData();
    postData.append('usuario_id', usuario_id);
    postData.append('filme_id', filme_id);
    return this.http.post(this.url + "favorita_filme.php", postData);
  }

  getFilmesFavoritos(usuario_id){
    let postData = new FormData();
    postData.append('usuario_id', usuario_id);
    return this.http.post(this.url + "retorna_filmes_favoritos.php", postData);
  }

}
