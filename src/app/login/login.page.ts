import { Component } from '@angular/core';
import { ServidorProviderService } from '../servidor-provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  campo: any;
  todo: any;
  erro: any;
  constructor(public servidor: ServidorProviderService, private router: Router) { 
    this.campo = {
      "usuario": "",
      "senha": "",
    };
    console.log(this.campo);
  }

  fazerLogin(){
    this.servidor.enviarLogin(this.campo).subscribe(data =>{
      let retorno = (data as any)._body;
      console.log(retorno);
      if(retorno == "Necessário passar usuário e senha" || retorno == "Usuário ou senha incorretos"){
        console.log('erro');
        this.erro = retorno;
      }else{
        console.log('ok');
        retorno = JSON.parse(retorno);
        console.log(retorno);
        localStorage.setItem("logado", "sim");
        localStorage.setItem("id_usuario", retorno.usuario_id);
        this.router.navigate(['home']);
      }
    },error =>{
      console.log(error);
      this.erro = "Erro de conexão com o servidor";
    });
  }

  fazerCadastro(){
    this.router.navigate(['cadastro']);
  }

  apagarErro(){
    this.erro = "";
  }

  

}
