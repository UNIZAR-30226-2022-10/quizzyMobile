import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { WebSocketProvider } from 'src/app/web-socket.service';

@Component({
  selector: 'app-options-admin',
  templateUrl: './options-admin.component.html',
  styleUrls: ['./options-admin.component.scss'],
})
export class OptionsAdminComponent implements OnInit {

  constructor(public webSocket: WebSocketProvider, public router: Router, public viewCtrl: PopoverController) { }

  ngOnInit() {}

  closeSession() {
    this.viewCtrl.dismiss();
    localStorage.clear();
    this.webSocket.disconnectSocket();
    this.router.navigate(['/home'])
  }

  validateQuestion() {
    this.viewCtrl.dismiss();
    this.router.navigate(['/questions-list'])
  }


}
