import { Actor } from './actor';
import * as PIXI from 'pixi.js';

export interface Coor {
    x: number;
    y: number;
  }

export class TrivialCell extends Actor{
    public numX: number;
    public numY: number;

    constructor(id: number, x: number, y: number){
        super();

        this.numX = x;
        this.numY = y;

        //this.beginFill(0xccefef);
        //this.drawCircle(0, 0, 10);
        //this.endFill();

    }

    getx(): number {
        return this.numX;
    }

    gety(): number{
        return this.numY;
    }
}
