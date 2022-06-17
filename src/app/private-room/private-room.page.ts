import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { WebSocketProvider } from '../web-socket.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

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
  selector: 'app-private-room',
  templateUrl: './private-room.page.html',
  styleUrls: ['./private-room.page.scss'],
})
export class PrivateRoomPage implements OnInit {

  actors: Player[] = [
  ];
  timeout: any;
  create : any;
  game :any;

  constructor(public router: Router, public http: HttpClient, public location: Location, public webSocket: WebSocketProvider) { }

  ngOnInit() {
    this.game = this.location.getState();
    console.log("Private", this.game);


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

      this.webSocket.turnSala((data) => {
        let id = -1;
        console.log(data.stats);

        this.webSocket.cleanup('server:turn');
        this.webSocket.cleanup('server:private:player:join');
        this.webSocket.cleanup('server:private:player:leave');

        Object.keys(data.stats).forEach(e => {
          console.log("E: ",e);
          this.userInfo(e).then(elem => {
            id++;
            this.actors.push({id: id, name: e, skin: '../../assets/cosmetics/cosmetic_' + elem['actual_cosmetic'] + '.png',
            tokens: data.stats[e].tokens, position: data.stats[e].position,
            correctAnswers: data.stats[e].correctAnswers, totalAnswers: data.stats[e].totalAnswers});
          });
          
          console.log("ADD USER");
        });

        this.timeout = setTimeout(() => {
          clearTimeout(this.timeout);
  
          console.log(this.actors);
          // localStorage.setItem('actors_' + rid,  JSON.stringify(this.actors));
          //  Rellenar algo si hace falta
           this.router.navigate(['/board/'+this.game.players.length + '/' + this.game.rid], {
            state: {
              pub: false,
              actors: this.actors,
              timeout: this.game.timeout,
              wildcardsUse: JSON.parse(this.game.wildcardsUse),
              difficulty: this.game.difficulty
            }
           });
        }, 500);
      });
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
      this.webSocket.cancelGamePrivate(this.game.rid, () => {});
    }
    else{
      this.webSocket.leavePrivateGame(this.game.rid, () => {});
    }

    this.webSocket.cleanup('server:turn');
    this.webSocket.cleanup('server:private:player:join');
    this.webSocket.cleanup('server:private:player:leave');

    this.router.navigate(['initial-menu']);
  }

  inviteFriends(){
    this.router.navigate(['/invite-friend'], {
      state:  {
        game : this.game
      }
    });
  }

  startGame(){
    this.webSocket.startGamePrivate(this.game.rid, ({ok, msg}) => {
      if ( !ok ) console.log("Error al comenzar la partida : " + msg);
    })

    this.webSocket.cleanup('server:turn');
    this.webSocket.cleanup('server:private:player:join');
    this.webSocket.cleanup('server:private:player:leave');

  
    this.webSocket.turnSala((data) => {
      let id = -1;
      console.log(data.stats);

      Object.keys(data.stats).forEach(e => {
        console.log("E: ",e);
        this.userInfo(e).then(elem => {
          id++;
          this.actors.push({id: id, name: e, skin: '../../assets/cosmetics/cosmetic_' + elem['actual_cosmetic'] + '.png',
          tokens: data.stats[e].tokens, position: data.stats[e].position,
          correctAnswers: data.stats[e].correctAnswers, totalAnswers: data.stats[e].totalAnswers});
        });
        
        console.log("ADD USER");
      });

      this.timeout = setTimeout(() => {
        clearTimeout(this.timeout);

        console.log(this.actors);
        // localStorage.setItem('actors_' + rid,  JSON.stringify(this.actors));
        //  Rellenar algo si hace falta
         this.router.navigate(['/board/'+this.game.players.length + '/' + this.game.rid], {
          state: {
            pub: false,
            actors: this.actors,
            timeout: this.game.timeout,
            wildcardsUse: JSON.parse(this.game.wildcardsUse),
            difficulty: this.game.difficulty
          }
         });
      }, 500);
    });
  }
}
