import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.page.html',
  styleUrls: ['./questions-list.page.scss'],
})
export class QuestionsListPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll

  question: Array<{text: string}> = [
    { text:'Prueba'},
    { text:'Prueba'},
    { text:'Prueba'},
    { text:'Prueba'},
    { text:'Prueba'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
