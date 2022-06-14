import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketProvider } from '../web-socket.service';

@Component({
  selector: 'app-public-room',
  templateUrl: './public-room.page.html',
  styleUrls: ['./public-room.page.scss'],
})
export class PublicRoomPage implements OnInit {
  
  cargando = true;

  constructor(public router : Router, public webSocket: WebSocketProvider) { }

  ngOnInit() {
    this.webSocket.responseJoinPublicGame(({rid}) => {
      console.log("TE HAS UNIDO A LA PARTIDA", rid);
      this.cargando = false;
    });  
    
  }

  goOut(){
    // Salir de la partida de forma controlada
    this.webSocket.leavePublicGame(({ok, msg}) => {
      console.log("PUBLIC:LEAVE", ok, msg);
      this.router.navigate(['/initial-menu']);
    });
  }

  salir(){
    return !this.cargando;
  }

}
