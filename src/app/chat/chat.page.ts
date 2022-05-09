import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  constructor() { }

  ngOnInit() {
<<<<<<< Updated upstream
  }

=======
    this.socket.connect();

    // Falta como conocer el nombre del usuario para ponerlo como usuario
    let name = `user - ${new Date().getTime()}`;
    this.currentUser = name;

    //Como manejar los chats dinamicamente?
    //this.socket.emit('chat:join', 'main');
    this.socket.emit('set-name', name);

    this.getUsers().subscribe(data => {
      let user = data['user'];
      if(data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });

   this.getMessages().subscribe(message => {
     this.messages.push(message);
   });
  }

  sendMessage() {
    this.socket.emit('send-message', { text: this.message });
    this.message = '';
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

  getMessages(){
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  async showToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
>>>>>>> Stashed changes
}
