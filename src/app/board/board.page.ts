import { Component, OnInit } from '@angular/core';
import { fromEvent, tap, Observable, Subscription, of, windowWhen } from 'rxjs';
import { TrivialCell } from './trivial-cell';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { PopoverController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DiceComponent } from '../components/dice/dice.component';

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
  actors: Player[];
  constructor(
    private screenOrientation: ScreenOrientation,
    private activatedRoute: ActivatedRoute,
    private popoverCtrl: PopoverController
  ) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

  unlockOrientation() {
    this.screenOrientation.unlock();
  }

  ngOnInit(): void {
    this.numPlayers = this.activatedRoute.snapshot.paramMap.get('numJugadores');
    for (let i = 0; i < this.numPlayers; i++){
      //this.actors.push({id: i+1, name: 'Player 1', skin:'assets/stitch', categoryAchieved: null});
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
        update: update,
      },
    };

    var phaserGame = new Phaser.Game(config);

    /**
     * Function for preloading assets into the game.
     */
    function preload() {
      this.load.image('background', 'assets/tableroFinalCentroCompleto.png');
      this.load.image('stitch', 'assets/stitch.png');
      for(let i= 0; i < this.numJugadores; i++){
        this.load.image('player'+(i+1).toString(),this.actors[i].skin);
      }
    }

    /**
     * This function will be called once at the component's startup.
     * Setup the objects which will be displayed into the scene
     */
    function create() {
      this.cells =[
        new TrivialCell( 0, window.innerWidth / 2,     window.innerHeight / 2), // 0
        new TrivialCell( 1, window.innerWidth / 2,     window.innerHeight / 2.75),
        new TrivialCell( 2, window.innerWidth / 2,     window.innerHeight/3.25),
        new TrivialCell( 3, window.innerWidth / 2,     window.innerHeight/4),
        new TrivialCell( 4, window.innerWidth / 1.725, window.innerHeight/2.4), //5
        new TrivialCell( 5, window.innerWidth / 1.63,  window.innerHeight / 2.55),
        new TrivialCell( 6, window.innerWidth / 1.55,  window.innerHeight / 2.7),
        new TrivialCell( 7, window.innerWidth / 1.725, window.innerHeight/1.9),
        new TrivialCell( 8, window.innerWidth / 1.63,  window.innerHeight / 1.8),
        new TrivialCell( 9, window.innerWidth / 1.55,  window.innerHeight / 1.7),
        new TrivialCell(10, window.innerWidth / 2,     window.innerHeight / 1.7), // 10
        new TrivialCell(11, window.innerWidth / 2,     window.innerHeight / 1.6),
        new TrivialCell(12, window.innerWidth / 2,     window.innerHeight / 1.45),
        new TrivialCell(13, window.innerWidth / 2.38,  window.innerHeight / 1.9),
        new TrivialCell(14, window.innerWidth / 2.55,  window.innerHeight / 1.8),
        new TrivialCell(15, window.innerWidth / 2.82,  window.innerHeight/1.7), // 15
        new TrivialCell(16, window.innerWidth / 2.38,  window.innerHeight / 2.4),
        new TrivialCell(17, window.innerWidth / 2.55,  window.innerHeight / 2.55),
        new TrivialCell(18, window.innerWidth / 2.82,  window.innerHeight / 2.7),
        new TrivialCell(19, window.innerWidth / 2,     window.innerHeight / 5),
        new TrivialCell(20, window.innerWidth / 1.82,  window.innerHeight / 5),
        new TrivialCell(21, window.innerWidth / 1.72,  window.innerHeight / 4.8), // 20
        new TrivialCell(22, window.innerWidth / 1.62,  window.innerHeight / 4.4),
        new TrivialCell(23, window.innerWidth / 1.55,  window.innerHeight / 4),
        new TrivialCell(24, window.innerWidth / 1.5,   window.innerHeight / 3.5),
        new TrivialCell(25, window.innerWidth / 1.45,  window.innerHeight / 3),
        new TrivialCell(26, window.innerWidth / 1.4,   window.innerHeight / 2.6), //25
        new TrivialCell(27, window.innerWidth / 1.39,  window.innerHeight / 2.3),
        new TrivialCell(28, window.innerWidth / 1.39,  window.innerHeight / 2.1),
        new TrivialCell(29, window.innerWidth / 1.39,  window.innerHeight / 1.95),
        new TrivialCell(30, window.innerWidth /1.4, window.innerHeight/1.78),
        new TrivialCell(31, window.innerWidth /1.45, window.innerHeight / 1.6), // 30
        new TrivialCell(32, window.innerWidth / 1.5,  window.innerHeight / 1.5),
        new TrivialCell(33, window.innerWidth / 1.55, window.innerHeight / 1.45),
        new TrivialCell(34, window.innerWidth / 1.62,window.innerHeight / 1.39),
        new TrivialCell(35, window.innerWidth / 1.72, window.innerHeight / 1.36),
        new TrivialCell(36, window.innerWidth / 1.82,window.innerHeight / 1.35), // 35
        new TrivialCell(37, window.innerWidth / 2, window.innerHeight / 1.35),
        new TrivialCell(38, window.innerWidth / 2.2, window.innerHeight / 1.35),
        new TrivialCell(39, window.innerWidth / 2.39, window.innerHeight / 1.36),
        new TrivialCell(40, window.innerWidth / 2.6,  window.innerHeight / 1.39),
        new TrivialCell(41, window.innerWidth / 2.8,  window.innerHeight / 1.45), // 40
        new TrivialCell(42, window.innerWidth / 3,   window.innerHeight / 1.5),
        new TrivialCell(43,window.innerWidth / 3.2, window.innerHeight / 1.6),
        new TrivialCell(44,window.innerWidth / 3.4, window.innerHeight/1.78),
        new TrivialCell(45, window.innerWidth / 3.5,   window.innerHeight / 1.95),
        new TrivialCell(46, window.innerWidth / 3.6,    window.innerHeight / 2.1), // 45
        new TrivialCell(47, window.innerWidth / 3.5, window.innerHeight / 2.3),
        new TrivialCell(48, window.innerWidth / 3.4, window.innerHeight / 2.6),
        new TrivialCell(49, window.innerWidth / 3.2, window.innerHeight / 3),
        new TrivialCell(50, window.innerWidth / 3, window.innerHeight / 3.5),
        new TrivialCell(51, window.innerWidth / 2.8,    window.innerHeight / 4), // 50
        new TrivialCell(52, window.innerWidth / 2.6,  window.innerHeight / 4.4),
        new TrivialCell(53, window.innerWidth / 2.39, window.innerHeight / 4.8),
        new TrivialCell(54, window.innerWidth / 2.2,  window.innerHeight / 5),
      ];
      var width = window.innerWidth;
      var height = window.innerHeight;
      this.text = this.add.text(10, 10, '', {
        font: '16px Courier',
        fill: '#00ff00',
      });
      this.bg = this.add.image(0, 0, 'background');
      this.bg.setScale(0.2, 0.2);

      this.player = this.add
      .image(width / 2, height / 2, 'stitch')
      .setInteractive();
      console.log(this.player.width);
      //this.player.setScale(0.1, 0.1);
      this.player.setDisplaySize(width/20,height/13);
      console.log(this.player.width);

      //this.stitch = this.add
        //.image(width / 2, height / 2, 'stitch')
        //.setInteractive();
 
      //this.stitch.setScale(0.1, 0.1);

      this.scale.on('resize', resize, this);

      showMovement([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54], this, this.player);
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

    function movePlayer(player, x, y){
        player.x = x;
        player.y = y;
    }

    function showMovement(arrayPos, thiss, player){
      let possibilities = [];
      let numberReturn = 0;
      for(let i= 0; i < arrayPos.length; i++){
        possibilities[i] = thiss.add.image(thiss.cells[arrayPos[i]].getx(), thiss.cells[arrayPos[i]].gety(), 'stitch').setInteractive();
        possibilities[i].setScale(0.1,0.1); 

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
    /**
     * Game loop routine. This function will be called once per frame, any displaying 
     * logic that updates with time ( movements, rotations, etc... ) should go here.
     * 
     * Don't call network services from here, as it will generate a great amount
     * of requests. If you need to interact with the backend, this should be done via
     * events on the create function.
     */
    function update() {
      var p = this.input.activePointer;

      this.text.setText([
        'x: ' + p.x,
        'y: ' + p.y,
        'duration: ' + p.getDuration(),
      ]);

    }

  }



  async showDice(){
    const popover = await this.popoverCtrl.create({
      component: DiceComponent
    });

    await popover.present();
  }
}
