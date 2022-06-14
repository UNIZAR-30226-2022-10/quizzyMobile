import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { WebSocketProvider } from 'src/app/web-socket.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {

  @Input("answers") answers;

  constructor(public webSocket: WebSocketProvider ,public router: Router, public viewCtrl: PopoverController) { }

  ngOnInit() {}

  closeSession() {
    this.viewCtrl.dismiss();
    localStorage.clear();
    this.webSocket.disconnectSocket();
    this.router.navigate(['/home'])
  }

  suggestQuestion() {
    this.viewCtrl.dismiss();
    this.router.navigate(['/suggest'])
  }

}
