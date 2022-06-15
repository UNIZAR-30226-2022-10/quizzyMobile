import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { fromEvent, tap, Observable, Subscription, of, windowWhen, ObjectUnsubscribedError } from 'rxjs';
import { TrivialCell } from './trivial-cell';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { MenuController, PopoverController, RouterLinkDelegate } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DiceComponent } from '../components/dice/dice.component';
import { BoardService } from './board.service';
import { async } from '@angular/core/testing';
import { TokensCardComponent } from '../components/tokens-card/tokens-card.component';
import { WebSocketProvider } from '../web-socket.service';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export interface Player {
  id: number;
  name: string;
  skin: string;
  categoryAchieved: any;
  position: number;
}
declare let Phaser;
@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit {
  phaserGame: any;
  config: any;
  player: any;
  cells: any;
  numPlayers: any;
  rid: any;
  actors: Player[] = [
  ];
  num: number;
  updated: boolean;
  players: any;
  game: any;

  constructor(
    public location: Location,
    public router: Router,
    private screenOrientation: ScreenOrientation,
    private activatedRoute: ActivatedRoute,
    private popoverCtrl: PopoverController,
    private boardService: BoardService,
    private menu: MenuController,
    public webSocket: WebSocketProvider,
    public http: HttpClient
  ) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

  showChat() {
    this.menu.enable(true, 'second');
    this.menu.open('second');
  }

  async showTokens(nickname) {
    this.getTokens(nickname.categoryAchieved);
    localStorage.setItem('id', JSON.stringify(nickname));
    const popover = await this.popoverCtrl.create({
      component: TokensCardComponent,
    });

    await popover.present();
  }

  returnMenu() {
    this.screenOrientation.unlock();
    this.router.navigate(['initial-menu']);
  }

  movePlayer(player, x, y){
    player.x = x;
    player.y = y;
  }

  ngOnInit(): void {
    
    this.game = this.location.getState();
      console.log("CONFIG", this.game);

    console.log(window.innerWidth / 2, window.innerHeight / 2);
    this.updated = false;
    this.rid = this.activatedRoute.snapshot.paramMap.get('rid');
    this.numPlayers = this.activatedRoute.snapshot.paramMap.get('numJugadores');

    /*localStorage.setItem('numPlayers', this.numPlayers);
    localStorage.setItem('rid', this.rid);

    console.log("ENTRE TABLERO", this.numPlayers, this.rid);
    let id = 0;
    this.webSocket.turn((data) => {
      Object.keys(data.stats).forEach(player => {
        this.getUser(data, id);
        id = id + 1;
      });
      //localStorage.removeItem('actors_' + this.rid);
      localStorage.setItem('actors_' + this.rid, JSON.stringify(this.actors));
    });

    this.actors = JSON.parse(localStorage.getItem('actors_'+this.rid));*/

    // si en el data Stats te devuelve answer... mirar si true o false y llamar a las opiones

    var config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      backgroundColor: "#FFFFFF",
      physics: {
        default: 'arcade',
      },
      scale: {
        mode: Phaser.Scale.RESIZE,
        parent: 'phaser-game',
        width: '100%',
        height: '100%',
      },
      scene: {
        preload: preload,
        create: create,
        //update: update,
      },
      game: this.game,
      webSocket: this.webSocket,
      router: this.router,
      rid: this.rid,
    };

    var phaserGame = new Phaser.Game(config);

    /**
     * Function for preloading assets into the game.
     */
    function preload() {
      /*let numPlayers = parseInt(localStorage.getItem('numPlayers'));
      let rid = localStorage.getItem('rid');
      let actors = JSON.parse(localStorage.getItem('actors_'+rid));*/

      console.log("PRELOAD: ", config.game.actors);

      this.load.image('background', 'assets/tableroFinalCentroCompleto.png');
      for(let i= 0; i < config.game.actors.length; i++){
        this.load.image(config.game.actors[i].name, config.game.actors[i].skin);
      }
    }

    /**
     * This function will be called once at the component's startup.
     * Setup the objects which will be displayed into the scene
     */
    function create() {
      /*let numPlayers = parseInt(localStorage.getItem('numPlayers'));
      let rid = parseInt(localStorage.getItem('rid'));
      let actors = JSON.parse(localStorage.getItem('actors_' + rid));*/

      let players: any;

      this.cells =[
        new TrivialCell( 0, window.innerWidth / 2,     window.innerHeight / 2, null),
        new TrivialCell( 1, window.innerWidth / 2,     window.innerHeight / 3.1, 4),
        new TrivialCell( 2, window.innerWidth / 2,     window.innerHeight / 4, 3),
        new TrivialCell( 3, window.innerWidth / 2,     window.innerHeight / 6, 2),
        new TrivialCell( 4, window.innerWidth / 1.525, window.innerHeight / 2.5, 1),
        new TrivialCell( 5, window.innerWidth / 1.38,  window.innerHeight / 2.7, 4),
        new TrivialCell( 6, window.innerWidth / 1.25,  window.innerHeight / 3, 3),
        new TrivialCell( 7, window.innerWidth / 1.525, window.innerHeight / 1.75, 5),
        new TrivialCell( 8, window.innerWidth / 1.38,  window.innerHeight / 1.6, 1),
        new TrivialCell( 9, window.innerWidth / 1.25,  window.innerHeight / 1.475, 4),
        new TrivialCell(10, window.innerWidth / 2,     window.innerHeight / 1.475, 0),
        new TrivialCell(11, window.innerWidth / 2,     window.innerHeight / 1.325,5),
        new TrivialCell(12, window.innerWidth / 2,     window.innerHeight / 1.2,1),
        new TrivialCell(13, window.innerWidth / 3,  window.innerHeight / 1.75,2),
        new TrivialCell(14, window.innerWidth / 3.65,  window.innerHeight / 1.62,0),
        new TrivialCell(15, window.innerWidth / 5,  window.innerHeight / 1.5,5),
        new TrivialCell(16, window.innerWidth / 3,  window.innerHeight / 2.5,3),
        new TrivialCell(17, window.innerWidth / 3.65,  window.innerHeight / 2.7,2),
        new TrivialCell(18, window.innerWidth / 5,  window.innerHeight / 3,0),
        new TrivialCell(19, window.innerWidth / 2,     window.innerHeight / 14,5),
        new TrivialCell(20, window.innerWidth / 1.7,  window.innerHeight / 12.5,1),
        new TrivialCell(21, window.innerWidth / 1.525,  window.innerHeight / 11,4),
        new TrivialCell(22, window.innerWidth / 1.385,  window.innerHeight / 8.5,null),
        new TrivialCell(23, window.innerWidth / 1.275,  window.innerHeight / 6.4,3),
        new TrivialCell(24, window.innerWidth / 1.2,   window.innerHeight / 4.8,2),
        new TrivialCell(25, window.innerWidth / 1.1375,  window.innerHeight / 3.5,0),
        new TrivialCell(26, window.innerWidth / 1.1,   window.innerHeight / 2.7,5),
        new TrivialCell(27, window.innerWidth / 1.075,  window.innerHeight / 2.3,1),
        new TrivialCell(28, window.innerWidth / 1.065,  window.innerHeight / 2,null),
        new TrivialCell(29, window.innerWidth / 1.075,  window.innerHeight / 1.75,4),
        new TrivialCell(30, window.innerWidth / 1.1,   window.innerHeight / 1.575,3),
        new TrivialCell(31, window.innerWidth / 1.1375,  window.innerHeight / 1.4,2),
        new TrivialCell(32, window.innerWidth / 1.225,   window.innerHeight / 1.26,0),
        new TrivialCell(33, window.innerWidth / 1.3,  window.innerHeight / 1.1875,5),
        new TrivialCell(34, window.innerWidth / 1.4,  window.innerHeight / 1.135,null),
        new TrivialCell(35, window.innerWidth / 1.525,  window.innerHeight / 1.1,1),
        new TrivialCell(36, window.innerWidth / 1.7,  window.innerHeight / 1.08,4),
        new TrivialCell(37, window.innerWidth / 2,     window.innerHeight / 1.075,3),
        new TrivialCell(38, window.innerWidth / 2.45,   window.innerHeight / 1.08,2),
        new TrivialCell(39, window.innerWidth / 2.95,  window.innerHeight / 1.1,0),
        new TrivialCell(40, window.innerWidth / 3.65,   window.innerHeight / 1.135,null),
        new TrivialCell(41, window.innerWidth / 4.65,   window.innerHeight / 1.1875,5),
        new TrivialCell(42, window.innerWidth / 6,     window.innerHeight / 1.26,1),
        new TrivialCell(43, window.innerWidth / 9,   window.innerHeight / 1.4,4),
        new TrivialCell(44, window.innerWidth / 12,   window.innerHeight / 1.575,3),
        new TrivialCell(45, window.innerWidth / 16,   window.innerHeight / 1.75,2),
        new TrivialCell(46, window.innerWidth / 20,   window.innerHeight / 2,null),
        new TrivialCell(47, window.innerWidth / 16,   window.innerHeight / 2.3,0),
        new TrivialCell(48, window.innerWidth / 12,   window.innerHeight / 2.7,5),
        new TrivialCell(49, window.innerWidth / 9,   window.innerHeight / 3.5,1),
        new TrivialCell(50, window.innerWidth / 6,     window.innerHeight / 4.75,4),
        new TrivialCell(51, window.innerWidth / 4.75,   window.innerHeight / 6.4,3),
        new TrivialCell(52, window.innerWidth / 3.7,   window.innerHeight / 8.5, null),
        new TrivialCell(53, window.innerWidth / 2.95,  window.innerHeight / 11,2),
        new TrivialCell(54, window.innerWidth / 2.45,   window.innerHeight / 12.5,0),
      ];
      var width = window.innerWidth;
      var height = window.innerHeight;
      this.text = this.add.text(10, 10, '', {
        font: '16px Courier',
        fill: '#00ff00',
      });

      this.bg = this.add.image(width / 2, height / 2, 'background');
      this.bg.setDisplaySize(width,height);

      this.players = [];

      for(let i = 0; i < config.game.actors.length; i++){
        this.players.push(this.add.image(this.cells[config.game.actors[i].position].getx(), 
                          this.cells[config.game.actors[i].position].gety(), config.game.actors[i].name).setInteractive());
        this.players.at(i).setDisplaySize(width/20,height/13);
      }

      this.scale.on('resize', resize, this);

      config.webSocket.startTurn(config.rid, config.game.pub, (res) => {
        console.log("START TURN : ", res);
        if(res.currentQuestion){

          console.log("SOY YO");

          config.router.navigate(['/single-question'], {
            state: {
              question: res.currentQuestion,
              timeout : res.timeout
            }
          });
          
        }
        else {
          console.log("No soy yo");
  
        }
      });

      /*let myActor = this.actors.filter((e) => e.nickname === localStorage.getItem('nickname'));

      console.log("MY ACTOR", myActor);
      //Partida

      this.startTurn(myActor[0].position);


      this.endTurn();*/
    }

    /**
     * Resize handler.
     * @param gameSize
     * @param baseSize
     * @param displaySize
     * @param resolution
     */
    function resize(gameSize, baseSize, displaySize, resolution) {
      var width = window.innerWidth;
      var height = window.innerHeight;

      this.cameras.resize(width, height);
      this.bg.setPosition(width / 2, height / 2);
    }

  }


  showMovement(arrayPos, thiss, player, id){
    let possibilities = [];
    let numberReturn = 0;
    for(let i= 0; i < arrayPos.length; i++){
      possibilities[i] = thiss.add.image(thiss.cells[arrayPos[i]].getx(), thiss.cells[arrayPos[i]].gety(), 'stitch').setInteractive();
      possibilities[i].setDisplaySize(window.innerWidth/20, window.innerHeight/13);

      possibilities[i].on('pointerdown', function() {
        this.setTint(0xff0000);
        numberReturn = arrayPos[i];
        this.actors[i].position = numberReturn;

        possibilities[i].on('pointerup', function() {
          for (const iter of possibilities) {
            iter.destroy();
          }
          this.movePlayer(player,thiss.cells[numberReturn].getx(), thiss.cells[numberReturn].gety());

        });

      });

    }
  }

  /*startTurn(position){
    console.log("ESPERANDO TURNO..");
    this.webSocket.startTurn(this.rid,this.pub.pub,({ok,msg}) => {
      console.log("Start Turn");
      if (ok === false){
        console.log("error ", msg);
      }
      else {
        this.callQuestion(position);
        console.log("CORRECTO");

      }
    });
  }

  getUser(nickname, id_){
    let url= 'http://quizzyappbackend.herokuapp.com/user/reduced';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'});
    let params = new HttpParams()
        .set('nickname', nickname.stats);
    let options = { headers : headers, params:params};

    return new Promise( (resolve,reject) => {
      this.http.get(url,options).subscribe(data => {
        const tokens = this.getTokens(nickname.tokens);
        this.actors.push({id: id_, name: nickname, skin: '../../assets/cosmetics/cosmetic_' + data[0].actual_cosmetic+'.png',
                           categoryAchieved: tokens, position: nickname.position});
        resolve(data);
      }, error => {
        reject(error);
        console.log(error);
      });
    });
  }


  callQuestion(numberCell){
    const cat = this.cells[numberCell].getCategory();

    this.router.navigate['/single-question/'+ cat];

  }
  endTurn() {

  }


  correctAnwser(idP, player){
    let num;
    let cells;
    this.webSocket.makeMove(true,this.rid,this.actors[idP].position, (data) =>{
      if ( data.ok === false) {
        return;
      }
      num = data.roll;
      cells = data.cells;
    });

    window.localStorage.setItem('Board', JSON.stringify(num));
    this.updated = true;

    let timeout = setTimeout( () => {
      this.showMovement(cells,this,player,idP);
      clearTimeout(timeout);
    }, 2000);

  }*/


  showPlayers(){
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  getTokens(token){
    let listToken: Array<string>;
    listToken = [];
    for (let i = 0; i < token.length; i++){
      if(token[i]){
        switch (i){
          case 0:
            listToken.push('geografia');
            break;
          case 1:
            listToken.push('arte');
            break;
          case 2:
            listToken.push('historia');
            break;
          case 3:
            listToken.push('ciencia');
            break;
          case 4:
            listToken.push('deportes');
            break;
          case 5:
            listToken.push('entretenimiento');
            break;
        }
      }
    }

    localStorage.setItem('tokens', JSON.stringify(listToken));
  }

  async showDice(){
    const popover = await this.popoverCtrl.create({
      component: DiceComponent,
    });


    await popover.present();
  }

}

/**CONTROL DEL JUEGO:
* ESPERAR A QUE TURN TE DEVUELVA TU ID
* CUANDO TE LO DEVUELVA START TURN Y COLOCAMOS A TODOS EN SU POSICION
* MOSTRAMOS UNA PREGUNTA
* SI ES CORRECTA LE DEJAMOS TIRAR EL DADO (MAKEMOVE)
* MOSTRAMOS LAS CASILLAS A DONDE PUEDE IR
* SI FALLA UNA PREGUNTA SE ACABA SU TURNO
* AL VOLVER TE SACA PREGUNTA DE ESA CASILLA
*/
