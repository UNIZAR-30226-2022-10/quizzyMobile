import { NgStyle } from '@angular/common';
import * as PIXI from 'pixi.js';
import { Actor } from "./actor";
import { TrivialCell } from './trivial-cell';

export class Player extends Actor{
    private lastUnix = 0;
    private threshold = 100;
    private app: any;
    private dude: PIXI.Sprite;

    constructor(private texture: PIXI.Texture, private _app: PIXI.Application){
        super();
            this.app = _app;
            let dude = new PIXI.Sprite(texture);
            dude.x = 0;
            dude.y = 0;
            dude.width = this.app.screen.width * (8/100);
            dude.height = this.app.screen.height * (8/100);
            this.dude = dude;
            this.app.stage.addChild(this.dude);
    }

    movePlayer(x: number, y: number) {
        this.dude.x = x;
        this.dude.y = y;
    }

    update(delta: number){

    }


    override onKeydown(e: KeyboardEvent): void {

    }
}
