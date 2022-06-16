import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { DiceComponent } from '../components/dice/dice.component';
import { WebSocketProvider } from '../web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(public http: HttpClient, private popoverCtrl: PopoverController, private webSocket: WebSocketProvider) { }

  players: any;
  id: any;
  cells:any;
  roll:any;
  num:any;
  cell:any;
  thisGame:any;
  actors:any;
  rid:any;
  pub:any;

  setPlayer(e){
    this.players = e;
  }

  setId(e){
    this.id = e;
    console.log("ID", this.id);
  }

  setCells(e){
    this.cells = e;
  }

  setRoll(e){
    this.roll = e;
    this.num = this.roll.roll;
    this.cell = this.roll.cells;
  }

  setThisGame(e){
    this.thisGame = e;
  }

  setActors(e){
    this.actors = e;
    console.log(this.actors);
  }

  showMovement(){
    let possibilities = [];
    let numberReturn = 0;
    for(let i= 0; i < this.cell.length; i++){
      const thisAtras = this;
      const num = this.cell[i];
      const actor = this.actors[this.id];
      const retun = this.cells[num];
      const player = this.players[this.id];
      const pub = this.pub;
      const rid = this.rid;
      const webSocket = this.webSocket;

      console.log("game:", this.thisGame);
      possibilities[i] = this.thisGame.add.image(this.cells[this.cell[i]].getx(), this.cells[this.cell[i]].gety(), this.actors[this.id].name).setInteractive();
      possibilities[i].setDisplaySize(window.innerWidth/20, window.innerHeight/13);

      possibilities[i].on('pointerdown', function() {
        this.setTint(0xff0000);
        numberReturn = num;

        console.log(actor);
        actor.position = numberReturn;

        possibilities[i].on('pointerup', function() {
          console.log("Pointerup");
          for (const iter of possibilities) {
            iter.destroy();
          }
          player.x = retun.getx();
          player.y = retun.gety();

          webSocket.makeMove(pub, rid, num, (data) =>{
            console.log("MAKE MOVE: ", data);
            if(data.ok){
              if(data.rollAgain){
                thisAtras.num = data.roll;
                thisAtras.cell = data.cells;
                thisAtras.showDice();
              }
            }
          });
        });

      });

    }
  }

  async showDice(){
    localStorage.setItem('Board', this.num);
    const popover = await this.popoverCtrl.create({
      component: DiceComponent,
    });

    await popover.present();
  }

  getUser(nickname){
    let url= 'http://quizzyappbackend.herokuapp.com/user/reduced';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'});
    let params = new HttpParams()
        .set('nickname', nickname);
    let options = { headers : headers, params:params};

    return new Promise( (resolve,reject) => {
      this.http.get(url,options).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }
}

