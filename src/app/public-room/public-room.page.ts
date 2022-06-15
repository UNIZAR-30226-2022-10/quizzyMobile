import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketProvider } from '../web-socket.service';

export interface Player {
  id: number;
  name: string;
  skin: string;
  categoryAchieved: Array<string>;
  position: number;
}

@Component({
  selector: 'app-public-room',
  templateUrl: './public-room.page.html',
  styleUrls: ['./public-room.page.scss'],
})
export class PublicRoomPage implements OnInit {
  
  cargando = true;
  players = [];
  time = 5;
  interval: any;
  timeout: any;
  actors: Player[] = [
  ];

  constructor(public http: HttpClient, public router : Router, public webSocket: WebSocketProvider) { }

  ngOnInit() {
    let id = 0;
    this.webSocket.responseJoinPublicGame(({rid}) => {
      console.log("TE HAS UNIDO A LA PARTIDA", rid);
      this.cargando = false;

      this.players = [];
      this.webSocket.turnSala((data) => {
        Object.keys(data.stats).forEach(e => {
          this.userInfo(e,id,0);
          id = id + 1;
          console.log("ADD USER");
        });
      });
      
      this.interval = setInterval(() => {
        this.time = this.time - 1;
      }, 1000);
      // go to tablero
  
      this.timeout = setTimeout(() => {
        clearInterval(this.interval);
        clearTimeout(this.timeout);

        console.log(this.actors);
        localStorage.setItem('actors_' + rid,  JSON.stringify(this.actors));
        //  Rellenar algo si hace falta
         this.router.navigate(['/board/'+this.players.length + '/' + rid]);
      }, 5000);

    });

  }

  userInfo(data, idPlayer, positionPlayer){
    console.log("Data", data);
    let url= 'http://quizzyappbackend.herokuapp.com/user/reduced';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'});
      let params = new HttpParams()
      .set('nickname', data)
    let options = { headers : headers, params:params};    
    return new Promise((resolve,reject) => {
      this.http.get(url, options ).subscribe(response => {
        this.players.push(response);
        this.actors.push({id: idPlayer, name: data, skin: '../../assets/cosmetics/cosmetic_' + this.players[idPlayer].actual_cosmetic + '.png',
                             categoryAchieved: [], position: positionPlayer});
        resolve(response);
      }, (error) => {
        reject(error);
      });
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
