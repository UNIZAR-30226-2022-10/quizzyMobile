import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class WebSocketProvider{

  constructor(public socket: Socket) {}

  connectSocket(){
     console.log("INTENTO CONEXION");
     this.socket.connect();
     console.log("CONECTADO, QUIZAS");
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

  createPrivateGame(data){
     this.socket.emit('private:create', data);
  }

  responseCreatePrivateGame(){
     return this.socket.fromEvent('private:create');
  }

  joinPrivateGame(rid){
     this.socket.emit('private:join',{rid});
  }

  responseJoinPrivateGame(){
     return this.socket.fromEvent('private:join');
  }

  leavePublicGame(){
     this.socket.emit('public:leave');
  }

  responseLeavePublicGame(){
     return this.socket.fromEvent('public:leave');
  }

  leavePrivateGame(rid){
     this.socket.emit('private:leave',{rid});
  }

  responseLeavePrivateGame(){
     return this.socket.fromEvent('private:leave');
  }

  startGamePrivate(rid){
     this.socket.emit('private:start', {rid});
  }

  responseStartGamePrivate(){
      return this.socket.fromEvent('private:start');
  }

  cancelGamePrivate(rid){
     this.socket.emit('private:cancel',{rid});
  }

  responseCancelGamePrivate(){
     return this.socket.fromEvent('private:cancel');
  }

  makeMove(publico,data){
     if(publico){
        this.socket.emit('public:makeMove', data);
     }
     else {
        this.socket.emit('private:makeMove', data);
     }
  }

  responseMakeMove(publico){
     if(publico){
        return this.socket.fromEvent('public:makeMove');
     }
     else {
        return this.socket.fromEvent('private:makeMove');
     }
  }

  questionTimeout(){
      return this.socket.fromEvent('server:timeout');
  }
  turn(){
    return this.socket.fromEvent('server:turn');
  }

  winner(){
    return this.socket.fromEvent('server:winner');
  }

  startTurn(publico,rid) {
     if(publico){
        this.socket.emit('public:startTurn', {rid});
     }
     else {
        this.socket.emit('private:startTurn', {rid});
     }
  }

   // PARA USARLO this.socketService.responseStartTurn().subscribe((data: any) => variable = data)
  responseStartTurn(pub){
     if(pub){
        return this.socket.fromEvent('public:startTurn');
     }
     else {
        return this.socket.fromEvent('private:startTurn');
     }
  }

  pause(pub,data){
     if(pub){
         this.socket.emit('public:pause', {data});
     }
     else {
         this.socket.emit('private:pause', {data});
     }
  }

  responsePause(pub){
     if(pub){
        return this.socket.fromEvent('public:pause');
     }
     else {
        return this.socket.fromEvent('private:pause');
     }
  }

  resume(pub,data){
      if(pub){
         this.socket.emit('public:resume',{data});
      }
      else {
         this.socket.emit('private:resume',{data});
      }
  }

  responseResume(pub){
     if(pub){
        return this.socket.fromEvent('public:resume');
     }
     else{
        return this.socket.fromEvent('private:resume');
     }

  }

  listenNewPlayers(){
     return this.socket.fromEvent('server:private:player:join');
  }

  listenLeavePlayers(){
     return this.socket.fromEvent('server:private:player:leave');
  }

  joinChat(rid){
     this.socket.emit('chat:join', {rid});
  }

  responseJoinChat(){
     return this.socket.fromEvent('chat:join');
  }

  sendMessage(data){
     this.socket.emit('chat:send', {data});
  }

  responseSendMessage(){
     return this.socket.fromEvent('chat:send');
  }

  subscribeToMessage(){
      return this.socket.fromEvent('chat:message');
  }
}
