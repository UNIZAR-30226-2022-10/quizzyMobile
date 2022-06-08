import { Injectable, Output } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from '@mobiscroll/angular/dist/js/core/util/misc';

@Injectable({
  providedIn: 'root'
})
export class WebSocketProvider{

  constructor(public socket: Socket) {}

   connectSocket(){
     console.log("INTENTO CONEXION");
     this.socket.connect();
     console.log("CONECTADO, QUIZAS")
   }

   disconnectSocket() {
      this.socket.disconnect();
   }

   joinPublicGame(){
     this.socket.emit('public:join');
   }

   responseJoinPublicGame(){
      return this.socket.fromEvent('public:join');
   }

   leavePublicGame(){
     this.socket.emit('public:leave');
   }

   responseLeavePublicGame(){
     return this.socket.fromEvent('public:leave');
   }

   makeMove(data){
    this.socket.emit('public:makeMove', {data});
  }

  responseMakeMove(){
    return this.socket.fromEvent('public:makeMove');
  }

   startTurn(rid) {
     this.socket.emit('public:startTurn', {rid});
   }

   // PARA USARLO this.socketService.responseStartTurn().subscribe((data: any) => variable = data)
   responseStartTurn(){
     return this.socket.fromEvent('public:startTurn');
   }

   pausePublic(){
     this.socket.emit('public:pause');
   }

   responsePausePublic(){
     return this.socket.fromEvent('public:pause');
   }

   resumePublic(){
     this.socket.emit('public:resume');
   }

   responseResumePublic(data){
     return this.socket.fromEvent('public:resume');
   }

}
