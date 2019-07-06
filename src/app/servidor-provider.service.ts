import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ServidorProviderService {

  url: string = "http://192.168.0.4/backFilme/";
  
  constructor(public http: Http) {
    console.log('SeridorProvider');  
  }

  fazerCadastro(campo){
    let postData = new FormData();
    postData.append('usuario', campo.usuario);
    postData.append('senha', campo.senha);
    console.log(campo);
    return this.http.post(this.url+'teste_conexao.php', postData);
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

  

}
