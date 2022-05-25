
export interface Coor {
    x: number;
    y: number;
  }

export class TrivialCell {
    public numX: number;
    public numY: number;

    constructor(id: number, x: number, y: number){

        this.numX = x;
        this.numY = y;

    }

    getx(): number {
        return this.numX;
    }

    gety(): number{
        return this.numY;
    }

    callQuestion(){
        //funcion Back que nos diga que categoria es
        //navigate question
    }
}
