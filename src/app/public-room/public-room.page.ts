import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketProvider } from '../web-socket.service';

export interface Player {
  id: number;
  name: string;
  skin: string;
  correctAnswers: Array<number>;
  totalAnswers: Array<number>;
  tokens: Array<string>;
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
    let id = -1;
    this.webSocket.responseJoinPublicGame(({rid}) => {
      console.log("TE HAS UNIDO A LA PARTIDA", rid);
      this.cargando = false;

      this.players = [];
      this.webSocket.turnSala((data) => {

        console.log(data.stats);

        Object.keys(data.stats).forEach(e => {
          console.log("E: ",e);
          this.userInfo(e,id,0).then(elem => {
            id++;
            this.actors.push({id: id, name: e, skin: '../../assets/cosmetics/cosmetic_' + elem['actual_cosmetic'] + '.png',
            tokens: data.stats[e].tokens, position: data.stats[e].position,
            correctAnswers: data.stats[e].correctAnswers, totalAnswers: data.stats[e].totalAnswers});
          });
          
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
        // localStorage.setItem('actors_' + rid,  JSON.stringify(this.actors));
        //  Rellenar algo si hace falta
         this.router.navigate(['/board/'+this.players.length + '/' + rid], {
          state: {
            pub: true,
            actors: this.actors
          }
         });
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
        
        resolve(response);
      }, (error) => {
        console.log("ERROR", data);
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
