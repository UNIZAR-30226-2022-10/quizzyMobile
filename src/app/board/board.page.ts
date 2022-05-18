import { Component, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js';
import { fromEvent, tap } from 'rxjs';
import { Actor } from './actor';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { Player } from './player';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit {

  numPlayers: any;

  private app: PIXI.Application = new PIXI.Application({
    width: window.innerHeight,
    height: window.innerWidth - 30,
    backgroundColor: 0xffffff
  });

  private actors: Actor[] = [];

  constructor(private screenOrientation: ScreenOrientation, private activatedRoute: ActivatedRoute) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
   }

  ngOnInit() {
    this.numPlayers = this.activatedRoute.snapshot.paramMap.get('numJugadores');
    const background = PIXI.Sprite.from('../../assets/tableroFinalCentroCompleto.png');
    background.width = this.app.screen.width;
    background.height = this.app.screen.height;
    console.log('BACK W: ', background.width, 'APP: ', this.app.screen.width);
    console.log('BACK H: ', background.height, 'APP: ', this.app.screen.height);
    this.app.stage.addChild(background);
    const stitch = PIXI.Texture.from('../../assets/stitch.png');
    const cube = PIXI.Texture.from('../../assets/cube.png');
    document.body.appendChild(this.app.view);
    for(let i = 0; i < this.numPlayers; i++){
      if(i%2 === 0){
        this.actors.push(new Player(stitch,this.app));
      }
      else {
        //this.actors.push(new Player(cube, this.app));
      }
    }
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
