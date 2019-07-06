import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalhes-filme',
  templateUrl: './detalhes-filme.page.html',
  styleUrls: ['./detalhes-filme.page.scss'],
})
export class DetalhesFilmePage {
  filme: any;
  constructor(private route: ActivatedRoute, private router: Router) { 
    this.filme = (this.router.getCurrentNavigation().extras.state as any).filme;
    console.log(this.filme);
  }



}
