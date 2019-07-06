import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ServidorProviderService {

  url: string = "http://localhost/backFilme/";
  
  constructor(public http: Http) {
    console.log('SeridorProvider');  
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

  getFilmes(){
    return this.http.get("https://api.themoviedb.org/3/movie/popular?api_key=8cfaeaaa6188782fdb202c89bf369a3f");
  }

  

}
