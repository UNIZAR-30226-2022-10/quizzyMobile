import * as PIXI from 'pixi.js';
import { Actor } from "./actor";
import { TrivialCell } from './trivial-cell';

export class Player extends Actor{
    private lastUnix = 0;
    private threshold = 100;

    constructor(private texture: PIXI.Texture, private container: PIXI.Container){
        super();
            const dude = new PIXI.Sprite(texture);
            dude.x = 0;
            dude.y = 0;
            dude.width = 50;
            dude.height = 50;
            container.addChild(dude);
            this.addChild(new TrivialCell(0, 0, this.children[0] as TrivialCell,container));
    }

    update(delta: number){
       /* var currentUnix = performance.now();
        var canResetUnix = false;
        for (let i = 0; i < this.children.length; i++) {
          canResetUnix = currentUnix - this.lastUnix >= this.threshold;
          if (canResetUnix) {
            const child = this.children[i] as TrivialCell;
            child.update();
          }
        }
        if (canResetUnix) {
          this.lastUnix = performance.now();
        }*/

    }

    override onKeydown(e: KeyboardEvent): void {

    }
}
