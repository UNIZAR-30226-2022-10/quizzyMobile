import { Component, OnInit } from '@angular/core';
import { fromEvent, tap, Observable, Subscription, of } from 'rxjs';
import { TrivialCell } from './trivial-cell';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { Player } from './player';
import { PopoverController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DiceComponent } from '../components/dice/dice.component';

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
    }

    /**
     * This function will be called once at the component's startup.
     * Setup the objects which will be displayed into the scene
     */
    function create() {
      this.cells =[
        new TrivialCell( 0,772, 346), // 0
        new TrivialCell( 1,767, 245),
        new TrivialCell( 2,767, 211),
        new TrivialCell( 3,767, 171),
        new TrivialCell( 4,891, 292), //5
        new TrivialCell( 5,940, 275),
        new TrivialCell( 6,996, 257),
        new TrivialCell( 7,890, 378),
        new TrivialCell( 8,939, 398),
        new TrivialCell( 9,997, 424),
        new TrivialCell(10,767, 423), // 10
        new TrivialCell(11,767, 457),
        new TrivialCell(12,767, 505),
        new TrivialCell(13,644, 380),
        new TrivialCell(14,596, 399),
        new TrivialCell(15,537, 421), // 15
        new TrivialCell(16,644, 291),
        new TrivialCell(17,592, 274),
        new TrivialCell(18,538, 253),
        new TrivialCell(19,770,120),
        new TrivialCell(20,849, 124),
        new TrivialCell(21,904, 132), // 20
        new TrivialCell(22,952, 149),
        new TrivialCell(23,955, 170),
        new TrivialCell(24,1037,192),
        new TrivialCell(25,1072,225),
        new TrivialCell(26,1107,267), //25
        new TrivialCell(27,1117,303),
        new TrivialCell(28,1119,336),
        new TrivialCell(29,1114, 371),
        new TrivialCell(30,1103, 405),
        new TrivialCell(31,1070, 445), // 30
        new TrivialCell(32,1029,476),
        new TrivialCell(33,988,502),
        new TrivialCell(34,946,517),
        new TrivialCell(35,897,535),
        new TrivialCell(36,847,543), // 35
        new TrivialCell(37,776,548),
        new TrivialCell(38,707,542),
        new TrivialCell(39,657,532),
        new TrivialCell(40,609,518),
        new TrivialCell(41,566,498), // 40
        new TrivialCell(42,525,477),
        new TrivialCell(43,486,442),
        new TrivialCell(44,452,402),
        new TrivialCell(45,440,371),
        new TrivialCell(46,437,336), // 45
        new TrivialCell(47,437,302),
        new TrivialCell(48,448,271),
        new TrivialCell(49,479,231),
        new TrivialCell(50,518,192),
        new TrivialCell(51,557,167), // 50
        new TrivialCell(52,607,149),
        new TrivialCell(53,653,132),
        new TrivialCell(54,705,122),
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
      this.player.setScale(0.1,0.1);

      this.stitch = this.add
        .image(width / 2, height / 2, 'stitch')
        .setInteractive();
      this.stitch.setScale(0.1, 0.1);
      this.stitch.on('click', function () {
        
      });

      this.stitch.on('pointerout', function () {
        this.clearTint();
      });
      console.log(this);

      this.input.setDraggable(this.stitch);

      this.input.on('dragstart', function (pointer, gameObject) {
        gameObject.setTint(0xff0000);
      });

      this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
      });

      this.input.on('dragend', function (pointer, gameObject) {
        gameObject.clearTint();
      });

      this.scale.on('resize', resize, this);

      let mov = showMovement([10, 54, 8], this);

      console.log("Salgo");
      console.log(mov);
      //movePlayer(this.player,this.cells[mov].getx(), this.cells[mov].gety());
    }

    /**
     * Resize handler.
     * @param gameSize 
     * @param baseSize 
     * @param displaySize 
     * @param resolution 
     */
    function resize(gameSize, baseSize, displaySize, resolution) {
      var width = gameSize.width;
      var height = gameSize.height;

      this.cameras.resize(width, height);
      this.bg.setPosition(width / 2, height / 2);
    }

    function movePlayer(player, x, y){
        player.x = x;
        player.y = y;
    }

    function showMovement(arrayPos, thiss): number{
      let possibilities = [];
      let numberReturn = 0;
      let pushed = false;
      for(let i= 0; i < arrayPos.length; i++){
        possibilities[i] = thiss.add.image(thiss.cells[arrayPos[i]].getx(), thiss.cells[arrayPos[i]].gety(), 'stitch').setInteractive();
        possibilities[i].setScale(0.1,0.1); 

        possibilities[i].on('pointerdown', function() {
          this.setTint(0xff0000);
          pushed = true;
          numberReturn = arrayPos[i];
          console.log(numberReturn);

          possibilities[i].on('pointerup', function() {
            for (const iter of possibilities) {
              iter.destroy();
            }
            return numberReturn;
          });
        });

        if(pushed){
          for (const iter of possibilities) {
            iter.destroy();
            console.log(iter);
          }
          return numberReturn;
        }
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

      movePlayer(this.player, 300, 4);
    }

  }



  async showDice(){
    const popover = await this.popoverCtrl.create({
      component: DiceComponent
    });

    await popover.present();
  }
}
