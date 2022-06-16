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

   turn(func:any){
      return this.socket.on('server:turn', func);
    }

    turnSala(func:any){
      return this.socket.once('server:turn', func);
    }

  createPrivateGame(data, func){
     this.socket.emit('private:create', data, func);
  }

  listenNewPlayers(func){
   return this.socket.on('server:private:player:join', func);
  }

listenLeavePlayers(func){
   return this.socket.on('server:private:player:leave', func);
}

listenCancelGamePrivate(func){
   return this.socket.on('server:private:cancelled', func);
}

cleanup(event){
   return this.socket.off(event);
}

leavePrivateGame(rid, func){
   this.socket.emit('private:leave',{rid}, func);
}

cancelGamePrivate(rid, func){
   this.socket.emit('private:cancel',{rid}, func);
}

joinPrivateGame(rid, func){
   this.socket.emit('private:join',{rid}, func);
}

startGamePrivate(rid, func){
   this.socket.emit('private:start', {rid}, func);
}

/*
  responseStartGamePrivate(){
      return this.socket.fromEvent('private:start');
  }*/


  makeMove(publico,rid,pos,func: any){
     if(publico){
        this.socket.emit('public:makeMove', {rid, pos}, func);
     }
     else {
        this.socket.emit('private:makeMove', {rid, pos}, func);
     }
  }

  answerQuestion(answer, pub, cb){
   this.socket.emit(`${pub ? "public" : "private"}:answer`, answer, cb);
   }
  
/*
  questionTimeout(){
      return this.socket.fromEvent('server:timeout');
  }
  

  winner(){
    return this.socket.fromEvent('server:winner');
  }*/

  startTurn(rid, pub, func: any) {
     if(pub){
        this.socket.emit('public:startTurn', {rid}, func);
     }
     else {
        this.socket.emit('private:startTurn', {rid}, func);
     }
  }

  /*
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

  }*/


  /*
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
     return this.socket.on('chat:send');
  }

  subscribeToMessage(){
      return this.socket.fromEvent('chat:message');
  }*/
  
}
