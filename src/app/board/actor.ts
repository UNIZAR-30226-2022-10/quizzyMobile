import * as PIXI from 'pixi.js';
export abstract class Actor extends PIXI.Graphics{
    update(delta: number){

    }

    onKeydown(e: KeyboardEvent){

    }
    onKeyup(e: KeyboardEvent){

    }

    lerp(start: number, end: number, amt: number){
        return (1 - amt) * start + amt * end;
    }
}
