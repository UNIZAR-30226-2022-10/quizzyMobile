import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-waiting-players',
  templateUrl: './waiting-players.page.html',
  styleUrls: ['./waiting-players.page.scss'],
})
export class WaitingPlayersPage implements OnInit {

  constructor() { }

  code = 'AXSC3C'

  data: any[] = Array(6);

  ngOnInit() {
  }

}
