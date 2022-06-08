import { Component, OnInit } from '@angular/core';
import { fromEvent, tap, Observable, Subscription, of, windowWhen } from 'rxjs';
import { TrivialCell } from './trivial-cell';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { MenuController, PopoverController, RouterLinkDelegate } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DiceComponent } from '../components/dice/dice.component';
import { BoardService } from './board.service';
import { Socket } from 'ngx-socket-io';
import { async } from '@angular/core/testing';
import { TokensCardComponent } from '../components/tokens-card/tokens-card.component';
import { WebSocketProvider } from '../web-socket.service';
      
export interface Player {
  id: number;
  name: string;
  skin: string;
  categoryAchieved: Array<string>;
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
  actors: Player[] = [
  ];
  num: number;
  updated: boolean;

  constructor(
    public router:Router,
    private screenOrientation: ScreenOrientation,
    private activatedRoute: ActivatedRoute,
    private popoverCtrl: PopoverController,
    private boardService: BoardService, 
    private socket: Socket,
    private menu: MenuController,
    private socketService: WebSocketProvider
  ) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

  showChat() {
    this.menu.enable(true, 'second');
    this.menu.open('second');
  }

  async showTokens() {
    const popover = await this.popoverCtrl.create({
      component: TokensCardComponent,
    });

    await popover.present();
  }

  returnMenu() {
    this.screenOrientation.unlock();
    this.router.navigate(['initial-menu']);
  }

  ngOnInit(): void {
    console.log(window.innerWidth / 2, window.innerHeight / 2);
    this.socket.ioSocket.io.opts.query = { Authorization: `${localStorage.getItem('token')}`};
    this.updated = false;
    this.numPlayers = this.activatedRoute.snapshot.paramMap.get('numJugadores');
    for (let i = 0; i < this.numPlayers; i++){
      //let data = this.boardService.getUser('NICKNAME');
      //this.actors.push({id:i+1, name:JSON.parse(JSON.stringify(data["nickname"])), skin:'../../assets/cosmetics/cosmetic_'+ JSON.parse(JSON.stringify(data["actual_cosmetic"])) + '.png', categoryAchieved:[]})
      this.actors.push({id:i+1, name:'juan', skin:'../../assets/cosmetic_10.png', categoryAchieved:['art']});
      //let data = this.boardService.getUser('NICKNAME');
     }

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
    };

    var phaserGame = new Phaser.Game(config);

    /**
     * Function for preloading assets into the game.
     */
    function preload() {
      this.load.image('background', 'assets/tableroFinalCentroCompleto.png');
      this.load.image('stitch', 'assets/cosmetic_10.png');
      for(let i= 0; i < this.numJugadores; i++){
        this.load.image(this.actors[i].nickname,this.actors[i].skin);
      }
    }

    /**
     * This function will be called once at the component's startup.
     * Setup the objects which will be displayed into the scene
     */
    function create() {
      this.cells =[
        new TrivialCell( 0, window.innerWidth / 2,     window.innerHeight / 2),
        new TrivialCell( 1, window.innerWidth / 2,     window.innerHeight / 3.1),
        new TrivialCell( 2, window.innerWidth / 2,     window.innerHeight / 4),
        new TrivialCell( 3, window.innerWidth / 2,     window.innerHeight / 6),
        new TrivialCell( 4, window.innerWidth / 1.525, window.innerHeight / 2.5),
        new TrivialCell( 5, window.innerWidth / 1.38,  window.innerHeight / 2.7),
        new TrivialCell( 6, window.innerWidth / 1.25,  window.innerHeight / 3),
        new TrivialCell( 7, window.innerWidth / 1.525, window.innerHeight / 1.75),
        new TrivialCell( 8, window.innerWidth / 1.38,  window.innerHeight / 1.6),
        new TrivialCell( 9, window.innerWidth / 1.25,  window.innerHeight / 1.475),
        new TrivialCell(10, window.innerWidth / 2,     window.innerHeight / 1.475),
        new TrivialCell(11, window.innerWidth / 2,     window.innerHeight / 1.325),
        new TrivialCell(12, window.innerWidth / 2,     window.innerHeight / 1.2),
        new TrivialCell(13, window.innerWidth / 3,  window.innerHeight / 1.75),
        new TrivialCell(14, window.innerWidth / 3.65,  window.innerHeight / 1.62),
        new TrivialCell(15, window.innerWidth / 5,  window.innerHeight / 1.5),
        new TrivialCell(16, window.innerWidth / 3,  window.innerHeight / 2.5),
        new TrivialCell(17, window.innerWidth / 3.65,  window.innerHeight / 2.7),
        new TrivialCell(18, window.innerWidth / 5,  window.innerHeight / 3),
        new TrivialCell(19, window.innerWidth / 2,     window.innerHeight / 14),
        new TrivialCell(20, window.innerWidth / 1.7,  window.innerHeight / 12.5),
        new TrivialCell(21, window.innerWidth / 1.525,  window.innerHeight / 11),
        new TrivialCell(22, window.innerWidth / 1.385,  window.innerHeight / 8.5),
        new TrivialCell(23, window.innerWidth / 1.275,  window.innerHeight / 6.4),
        new TrivialCell(24, window.innerWidth / 1.2,   window.innerHeight / 4.8),
        new TrivialCell(25, window.innerWidth / 1.1375,  window.innerHeight / 3.5),
        new TrivialCell(26, window.innerWidth / 1.1,   window.innerHeight / 2.7),
        new TrivialCell(27, window.innerWidth / 1.075,  window.innerHeight / 2.3),
        new TrivialCell(28, window.innerWidth / 1.065,  window.innerHeight / 2),
        new TrivialCell(29, window.innerWidth / 1.075,  window.innerHeight / 1.75),
        new TrivialCell(30, window.innerWidth / 1.1,   window.innerHeight / 1.575),
        new TrivialCell(31, window.innerWidth / 1.1375,  window.innerHeight / 1.4),
        new TrivialCell(32, window.innerWidth / 1.225,   window.innerHeight / 1.26),
        new TrivialCell(33, window.innerWidth / 1.3,  window.innerHeight / 1.1875),
        new TrivialCell(34, window.innerWidth / 1.4,  window.innerHeight / 1.135),
        new TrivialCell(35, window.innerWidth / 1.525,  window.innerHeight / 1.1),
        new TrivialCell(36, window.innerWidth / 1.7,  window.innerHeight / 1.08),
        new TrivialCell(37, window.innerWidth / 2,     window.innerHeight / 1.075),
        new TrivialCell(38, window.innerWidth / 2.45,   window.innerHeight / 1.08),
        new TrivialCell(39, window.innerWidth / 2.95,  window.innerHeight / 1.1),
        new TrivialCell(40, window.innerWidth / 3.65,   window.innerHeight / 1.135),
        new TrivialCell(41, window.innerWidth / 4.65,   window.innerHeight / 1.1875),
        new TrivialCell(42, window.innerWidth / 6,     window.innerHeight / 1.26),
        new TrivialCell(43, window.innerWidth / 9,   window.innerHeight / 1.4),
        new TrivialCell(44, window.innerWidth / 12,   window.innerHeight / 1.575),
        new TrivialCell(45, window.innerWidth / 16,   window.innerHeight / 1.75),
        new TrivialCell(46, window.innerWidth / 20,   window.innerHeight / 2),
        new TrivialCell(47, window.innerWidth / 16,   window.innerHeight / 2.3),
        new TrivialCell(48, window.innerWidth / 12,   window.innerHeight / 2.7),
        new TrivialCell(49, window.innerWidth / 9,   window.innerHeight / 3.5),
        new TrivialCell(50, window.innerWidth / 6,     window.innerHeight / 4.75),
        new TrivialCell(51, window.innerWidth / 4.75,   window.innerHeight / 6.4),
        new TrivialCell(52, window.innerWidth / 3.7,   window.innerHeight / 8.5),
        new TrivialCell(53, window.innerWidth / 2.95,  window.innerHeight / 11),
        new TrivialCell(54, window.innerWidth / 2.45,   window.innerHeight / 12.5),
      ];
      var width = window.innerWidth;
      var height = window.innerHeight;
      this.text = this.add.text(10, 10, '', {
        font: '16px Courier',
        fill: '#00ff00',
      });
      
      this.bg = this.add.image(width / 2, height / 2, 'background');
      this.bg.setDisplaySize(width,height);

      this.player = this.add
      .image(width / 2, height / 2, 'stitch')
      .setInteractive();
      //this.player.setScale(0.1, 0.1);
      this.player.setDisplaySize(width/20,height/13);

      //this.stitch = this.add
        //.image(width / 2, height / 2, 'stitch')
        //.setInteractive();
 
      //this.stitch.setScale(0.1, 0.1);

      this.scale.on('resize', resize, this);

      // mientras no se haya acabado el juego 

      waitTurn();

      roll();
      //showMovement([0,1,2,3,19,37,54,20,53,21,52,51,50,49,48,47/*,3,4,5,6,7,8,9*/,10,11,12/*,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54*/], this, this.player);
      showMovement([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54], this, this.player);

      endTurn();
      //movePlayer(this.player,this.cells[23].getx(), this.cells[23].gety());
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

    function roll() {
      //socket.emit('')
    }
    function movePlayer(player, x, y){
        player.x = x;
        player.y = y;
    }

    function showMovement(arrayPos, thiss, player){
      let possibilities = [];
      let numberReturn = 0;
      for(let i= 0; i < arrayPos.length; i++){
        possibilities[i] = thiss.add.image(thiss.cells[arrayPos[i]].getx(), thiss.cells[arrayPos[i]].gety(), 'stitch').setInteractive();
        possibilities[i].setDisplaySize(window.innerWidth/20, window.innerHeight/13);

        possibilities[i].on('pointerdown', function() {
          this.setTint(0xff0000);
          numberReturn = arrayPos[i];
          console.log(numberReturn);

          possibilities[i].on('pointerup', function() {
            for (const iter of possibilities) {
              iter.destroy();
            }
            movePlayer(player,thiss.cells[numberReturn].getx(), thiss.cells[numberReturn].gety());
            
          });
        });

      }
    }

    function waitTurn(){

    }

    function endTurn() {

    }

    /**
     * Game loop routine. This function will be called once per frame, any displaying 
     * logic that updates with time ( movements, rotations, etc... ) should go here.
     * 
     * Don't call network services from here, as it will generate a great amount
     * of requests. If you need to interact with the backend, this should be done via
     * events on the create function.
     */
    /*function update() {
      var p = this.input.activePointer;
      this.text.setText([
        'x: ' + p.x,
        'y: ' + p.y,
        'duration: ' + p.getDuration(),
      ]);
    }*/

  }

  showPlayers(){
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }


  async showDice(){
    const popover = await this.popoverCtrl.create({
      component: DiceComponent,
    });
    this.num = Math.floor(Math.random() * 6) + 1;

    window.localStorage.setItem('Board', JSON.stringify(this.num));

    await popover.present();

  }
}
