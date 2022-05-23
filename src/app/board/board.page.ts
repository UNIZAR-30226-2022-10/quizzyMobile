import { Component, OnInit } from '@angular/core';
import { fromEvent, tap, Observable, Subscription, of } from 'rxjs';
import { TrivialCell } from './trivial-cell';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { Player } from './player';
import { ActivatedRoute } from '@angular/router';

declare let Phaser;
@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit {
  phaserGame: any;
  config: any;

  constructor(
    private screenOrientation: ScreenOrientation,
    private activatedRoute: ActivatedRoute
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
      var width = window.innerWidth;
      var height = window.innerHeight;
      this.text = this.add.text(10, 10, '', {
        font: '16px Courier',
        fill: '#00ff00',
      });
      this.bg = this.add.image(0, 0, 'background');
      this.bg.setScale(0.2, 0.2);

      this.stitch = this.add
        .image(width / 2, height / 2, 'stitch')
        .setInteractive();
      this.stitch.setScale(0.1, 0.1);
      this.stitch.on('pointerover', function () {
        this.setTint(0x00ff00);
      });

      this.stitch.on('pointerout', function () {
        this.clearTint();
      });

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
}
