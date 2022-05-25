import { Injectable, Output } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketProvider{

  constructor(public socket: Socket) {
    //socket.ioSocket.io.opts.query = { Authorization: `${localStorage.getItem('token')}` };
   }
 
   public connectSocket(){
     console.log("INTENTO CONEXION");
     this.socket.connect();
     console.log("CONECTADO, QUIZAS")
   }

   public disconnectSocket() {
      this.socket.disconnect();
   }

   
}
