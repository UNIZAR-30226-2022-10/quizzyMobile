import { Component, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js';
import { fromEvent, tap } from 'rxjs';
import { Actor } from './actor';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { Player } from './player';

@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit {

  private app: PIXI.Application = new PIXI.Application({
    width: window.innerHeight,
    height: window.innerWidth - 20,
    backgroundColor: 0xffffff
  });


  private actors: Actor[] = [];

  constructor(private screenOrientation: ScreenOrientation) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
   }

  ngOnInit() {
    const background = PIXI.Sprite.from('../../assets/tableroFinalCentroCompleto.png');
    background.width = this.app.screen.width;
    background.height = this.app.screen.height;
    this.app.stage.addChild(background);
    const stitch = PIXI.Texture.from('../../assets/stitch.png');
    document.body.appendChild(this.app.view);
    let container = new PIXI.Container();
    this.app.stage.addChild(container);
    this.actors.push(new Player(stitch,container));
    this.initActors();
  }


  initActors() {


    // Call actor update method
    for (let i = 0; i < this.actors.length; i++){
      const actor = this.actors[i];
      this.app.stage.addChild(actor);
      this.app.ticker.add( (e) => actor.update(e));
    }

    fromEvent(document, 'keydown')
    .pipe(tap((e: any) => {
      for (let i = 0; i < this.actors.length; i++) {
        const actor = this.actors[i];
        actor.onKeydown(e);
      }
    })).subscribe();

    fromEvent(document, 'keyup')
        .pipe(tap((e: any) => {
          for (let i = 0; i < this.actors.length; i++) {
            const actor = this.actors[i];
            actor.onKeyup(e);
          }
        })).subscribe();


  }

  unlockOrientation(){
    this.screenOrientation.unlock();
  }

}
