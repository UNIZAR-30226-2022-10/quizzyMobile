import { Actor } from "./actor";
import * as PIXI from 'pixi.js';

export class TrivialCell extends Actor{
    public numX: number;
    public numY: number;

    public container: PIXI.Container;

    private directionX = 1;
    private directionY = 0;

    private next: TrivialCell | undefined = void 0;

    constructor(x: number, y: number, prev: TrivialCell, container: PIXI.Container){
        super();

        this.numX = x;
        this.numY = y;

        this.container = container;

        if (prev) {
            prev.next = this;
        }

        //this.beginFill(0xccefef);
        //this.drawCircle(0, 0, 10);
        //this.endFill();

        var worldPosition = this.getWorldPosition();
        this.position.x = worldPosition.x;
        this.position.y = worldPosition.y;
        this.container.x = worldPosition.x;
        this.container.y = worldPosition.y;
    }
    getWorldPosition() {
        var tileSize = 20;
        return { x: (this.numX * tileSize) + 10, y: (this.numY * tileSize) + 10 };
    }

    override update() {
        if(!this.next){
            this.numX += this.directionX;
            this.numY += this.directionY;
        } else {
            this.numX = this.next.numX;
            this.numY = this.next.numY;
        }

        var position = this.getWorldPosition();
        this.container.x = position.x;
        this.container.y = position.y;
    }
}
