import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-lista-partidas',
  templateUrl: './lista-partidas.component.html',
  styleUrls: ['./lista-partidas.component.scss'],
})

export class ListaPartidasComponent implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll

  data: any[] = Array(10);
  
  constructor() { }

  ngOnInit() {
  }
/*
  loadGames(event) {
    console.log('Cargando Partidas');
    
    setTimeout(() => {

      if (this.data.length >50){
        event.target.complete();
        this.infiniteScroll.disabled = true;
        return;
      }

      const newArray = Array(5);
      this.data.push( ...newArray );
      event.target.complete();
    }, 1000);
  }
  */
}

