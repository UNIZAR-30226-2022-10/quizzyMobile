
export interface Coor {
    x: number;
    y: number;
  }

export class TrivialCell {
    private numX: number;
    private numY: number;
    private cat: number;

    constructor(id: number, x: number, y: number, category: number){

        this.numX = x;
        this.numY = y;
        this.cat = category;

    }

    getx(): number {
        return this.numX;
    }

    gety(): number{
        return this.numY;
    }

    getCategory(): number {
        if(this.cat === null) {
            this.cat = Math.random() * 5;
        }
        return this.cat;
    }
}
