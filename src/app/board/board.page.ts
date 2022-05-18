import { Component, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js';
import { fromEvent, tap, Observable, Subscription } from 'rxjs';
import { Actor } from './actor';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { Player } from './player';
import { ActivatedRoute } from '@angular/router';

class Game {

}

@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit {
  numPlayers: any;

  private app: PIXI.Application;

  private actors: Player[] = [];

  constructor(
    private screenOrientation: ScreenOrientation,
    private activatedRoute: ActivatedRoute
  ) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xffffff,
      antialias: true,
      resizeTo: window
    });
  }

  ngOnInit() {
    this.numPlayers = this.activatedRoute.snapshot.paramMap.get('numJugadores');
    
    let bg = PIXI.Sprite.from(
      '../../assets/tableroFinalCentroCompleto.png'
    );
    bg.width = window.innerWidth;
    bg.height = window.innerHeight;
    //console.log('BACK W: ', bg.width, 'APP: ', this.app.screen.width);
    //console.log('BACK H: ', bg.height, 'APP: ', this.app.screen.height);
    this.app.stage.addChild(bg);
    
    const stitch = PIXI.Texture.from('../../assets/stitch.png');
    const cube = PIXI.Texture.from('../../assets/cube.png');
    for (let i = 0; i < this.numPlayers; i++) {
      if (i % 2 === 0) {
        this.actors.push(new Player(stitch, this.app));
      } else {
        this.actors.push(new Player(cube, this.app));
      }
    }

    //this.initActors();

    // main game loop
    this.app.ticker.add(function() {
      // resize background
      bg.width = window.innerWidth;
      bg.height = window.innerHeight;
    });

    document.body.appendChild(this.app.view);

    this.actors[0].movePlayer(0, 0);
    this.actors[1].movePlayer(100, 0);
    this.actors[2].movePlayer(0, 100);
    this.actors[3].movePlayer(200, 0);
    this.actors[4].movePlayer(100, 400);
    this.actors[5].movePlayer(300, 200);
  }

  initActors() {
    // Call actor update method
    for (let i = 0; i < this.actors.length; i++) {
      const actor = this.actors[i];
      this.app.stage.addChild(actor);
      this.app.ticker.add((e) => actor.update(e));
    }

    fromEvent(document, 'keydown')
      .pipe(
        tap((e: any) => {
          for (let i = 0; i < this.actors.length; i++) {
            const actor = this.actors[i];
            actor.onKeydown(e);
          }
        })
      )
      .subscribe();

    fromEvent(document, 'keyup')
      .pipe(
        tap((e: any) => {
          for (let i = 0; i < this.actors.length; i++) {
            const actor = this.actors[i];
            actor.onKeyup(e);
          }
        })
      )
      .subscribe();
  }

  unlockOrientation() {
    this.screenOrientation.unlock();
  }

  destroy() {
    this.app.destroy();
  }

  ngOnDestroy(): void {
    this.destroy();
  }
}
