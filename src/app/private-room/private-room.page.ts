import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { WebSocketProvider } from '../web-socket.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private-room',
  templateUrl: './private-room.page.html',
  styleUrls: ['./private-room.page.scss'],
})
export class PrivateRoomPage implements OnInit {

  create : any;
  game :any;

  constructor(public router: Router, public http: HttpClient, public location: Location, public webSocket: WebSocketProvider) { }

  ngOnInit() {
    this.game = this.location.getState();
    console.log(this.game);


    if(!this.game.create){
      console.log("ENTRO MI PANA")
      var playersTemp = this.game.players;
      this.game.players = [];

      playersTemp.forEach((e) => {
        this.userInfo(e).then( elem => {

          if(elem['ok']){
            
            console.log(e);
            this.game.players.push({nickname: e, cosmetic : elem['actual_cosmetic']})
          }
        })
      })
    }

    console.log(this.game);

    this.webSocket.listenNewPlayers(({player}) => {

      this.userInfo(player).then( e => {

        if(e['ok']){
          
          console.log(e);
          this.game.players.push({nickname: player, cosmetic : e['actual_cosmetic']})
        }
      })

     
    })

    this.webSocket.listenLeavePlayers(({player}) => {
      console.log(player);
      this.game.players = this.game.players.filter((u) => u.nickname != player);

      console.log(this.game.players);
    })

    if(!this.game.create){
      this.webSocket.listenCancelGamePrivate(() => {
        this.router.navigate(['initial-menu']);
      })
    }
    
  }

  userInfo(data){
    let url= 'http://quizzyappbackend.herokuapp.com/user/reduced';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'});
      let params = new HttpParams()
      .set('nickname', data)
    let options = { headers : headers, params:params};    
    return new Promise((resolve,reject) => {
      this.http.get(url, options ).subscribe(response => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }


  goOut(){
    if(this.game.create){
      this.webSocket.cancelGamePrivate(this.game.rid, () => {})
    }
    else{
      this.webSocket.leavePrivateGame(this.game.rid, () => {})
    }

    this.webSocket.cleanup('server:turn');
    this.webSocket.cleanup('server:private:player:join');
    this.webSocket.cleanup('server:private:player:leave');

    this.router.navigate(['initial-menu']);
  }

  inviteFriends(){

  }

  startGame(){

  }
}
