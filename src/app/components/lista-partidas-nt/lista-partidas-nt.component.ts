import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';


@Component({
  selector: 'app-lista-partidas-nt',
  templateUrl: './lista-partidas-nt.component.html',
  styleUrls: ['./lista-partidas-nt.component.scss'],
})
export class ListaPartidasNtComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll

  dataNt: any[] = Array(10);
  
  constructor() { }

  ngOnInit() {
  }
/*
  loadGamesNt(event) {
    console.log('Cargando Partidas');
    
    setTimeout(() => {

      if (this.dataNt.length >50){
        event.target.complete();
        this.infiniteScroll.disabled = true;
        return;
      }

      const newArray = Array(5);
      this.dataNt.push( ...newArray );
      event.target.complete();
    }, 1000);
  }
  */
}

