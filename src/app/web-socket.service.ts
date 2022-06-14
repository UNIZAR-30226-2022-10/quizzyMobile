import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
   providedIn: 'root'
 })
export class WebSocketProvider{

   
   socket:Socket
         

   

  constructor() {
   this.socket = io(environment.backendUrl, {
      auth: {
        token: localStorage.getItem('token')
      }
      
    });
  }

  connectSocket(){
     console.log("INTENTO CONEXION");
     this.socket.connect();
     
     console.log("CONECTADO, QUIZAS");
  }

  disconnectSocket() {
      this.socket.disconnect();
  }

   joinPublicGame(func:Function){
     this.socket.emit('public:join', func);     
   }

   responseJoinPublicGame(func:any){
      return this.socket.once('server:public:joined',func);
   }

   leavePublicGame(func:Function){
      this.socket.emit('public:leave', func);
   }
/*
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

  startTurn(rid:any, pub:any) {
     if(pub){
        this.socket.emit('public:startTurn', {rid});
     }
     else {
        this.socket.emit('private:startTurn', {rid});
     }
  }

   // PARA USARLO this.socketService.responseStartTurn().subscribe((data: any) => variable = data)
  responseStartTurn(func:any){
     if(pub){
        return this.socket.fromEvent('public:startTurn', func);
     }
     else {
        return this.socket.fromEvent('private:startTurn', func);
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
  */
}
