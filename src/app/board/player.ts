import { NgStyle } from '@angular/common';
import * as PIXI from 'pixi.js';
import { Actor } from "./actor";
import { TrivialCell } from './trivial-cell';

export class Player extends Actor{
    private lastUnix = 0;
    private threshold = 100;
    private app: any;
    private dude;
    private cells = [];
    constructor(private texture: PIXI.Texture, private _app: PIXI.Application){
        super();
            this.app = _app;
            const dude = new PIXI.Sprite(texture);
            dude.x = 0;
            dude.y = 0;
            dude.width = this.app.screen.width * (8/100);
            dude.height = this.app.screen.height * (8/100);
            this.dude = dude;
            this.app.stage.addChild(this.dude);
            console.log(this.app.screen.width, ' QUIERO LA MITAD: ', this.app.screen.width*(5/100));
            this.createArrayCells(this.app, dude);
            console.log(this.cells[0]);
            this.addChild(new TrivialCell(this.app.screen.width/45, this.app.screen.height/45, this.children[0] as TrivialCell,dude));
    }

    update(delta: number){
      var currentUnix = performance.now();
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
        }

    }

    createArrayCells(app: PIXI.Application, dude: PIXI.Sprite){
      this.cells =[
        new TrivialCell(app.screen.width/45, app.screen.height/45, this.children[0] as TrivialCell,dude), // 0
        new TrivialCell(app.screen.width/45, app.screen.height/80, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/45, app.screen.height/115, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/45, app.screen.height/195, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/33, app.screen.height/60, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/29.5, app.screen.height/65, this.children[0] as TrivialCell,dude), //5
        new TrivialCell(app.screen.width/26.5, app.screen.height/75, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/29.5, app.screen.height/36, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/33, app.screen.height/39, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/26.5, app.screen.height/33, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/45, app.screen.height/33, this.children[0] as TrivialCell,dude), // 10
        new TrivialCell(app.screen.width/45, app.screen.height/30, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/45, app.screen.height/26, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/70, app.screen.height/39, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/90, app.screen.height/36, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/130, app.screen.height/33, this.children[0] as TrivialCell,dude), // 15
        new TrivialCell(app.screen.width/70, app.screen.height/60, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/90, app.screen.height/65, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/130, app.screen.height/75, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/45, app.screen.height/0, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/37, app.screen.height/0, this.children[0] as TrivialCell,dude), // 20
        new TrivialCell(app.screen.width/33, app.screen.height/1000, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/29.5, app.screen.height/500, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/27.5, app.screen.height/200, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/25.5, app.screen.height/140, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/24, app.screen.height/100, this.children[0] as TrivialCell,dude), //25
        new TrivialCell(app.screen.width/23, app.screen.height/70, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/22.5, app.screen.height/55, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/22.5, app.screen.height/45, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/22.5, app.screen.height/40, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/23, app.screen.height/35, this.children[0] as TrivialCell,dude), // 30
        new TrivialCell(app.screen.width/24, app.screen.height/30, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/25.5, app.screen.height/27.5, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/27.5, app.screen.height/26, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/29.5, app.screen.height/25, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/33, app.screen.height/24, this.children[0] as TrivialCell,dude), // 35
        new TrivialCell(app.screen.width/37, app.screen.height/23.5, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/45, app.screen.height/23, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/56, app.screen.height/23.5, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/70, app.screen.height/24, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/90, app.screen.height/25, this.children[0] as TrivialCell,dude), // 40
        new TrivialCell(app.screen.width/120, app.screen.height/26, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/170, app.screen.height/27.5, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/300, app.screen.height/30, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/700, app.screen.height/35, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/0, app.screen.height/40, this.children[0] as TrivialCell,dude), // 45
        new TrivialCell(app.screen.width/0, app.screen.height/45, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/0, app.screen.height/55, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/700, app.screen.height/70, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/300, app.screen.height/100, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/170, app.screen.height/140, this.children[0] as TrivialCell,dude), // 50
        new TrivialCell(app.screen.width/120, app.screen.height/200, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/90, app.screen.height/500, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/70, app.screen.height/1000, this.children[0] as TrivialCell,dude),
        new TrivialCell(app.screen.width/56, app.screen.height/0, this.children[0] as TrivialCell,dude),
      ];
    }

    override onKeydown(e: KeyboardEvent): void {

    }
}
