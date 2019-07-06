import { Component } from '@angular/core';
import { ServidorProviderService } from '../servidor-provider.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage{
  campo: any;
  retornoCadastro: any;
  erro: string = "";
  constructor( private servidor: ServidorProviderService, private router: Router, public alertController: AlertController ) {
    this.campo = {
      "usuario": "",
      "senha": "",
    }
  }

  apagarErro(){
    this.erro = "";
  }

  fazerCadastro(){
    console.log(this.campo);
    this.servidor.fazerCadastro(this.campo).subscribe(data =>{
      console.log(data);
      this.retornoCadastro = (data as any)._body;
      console.log(this.retornoCadastro);
      if(this.retornoCadastro == "false"){
        this.erro = "Usuario já existe";
      }else if(this.retornoCadastro == "Necessário passar usuário e senha"){
        this.erro = "Necessário passar usuário e senha"
      }else if(this.retornoCadastro == "true"){
        console.log("igual a true");
        this.mostrarAlert();
      }
    },error =>{
      console.log(error);
    });
  }

  voltar(){
    this.router.navigate(['login']);
  }

  async mostrarAlert() {
    const alert = await this.alertController.create({
      header: 'Cadastro Realizado com sucesso!',
      message: '',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['login']);
          }
        }
      ]
    });

    await alert.present();
  }


}
