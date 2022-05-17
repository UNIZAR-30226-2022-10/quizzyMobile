import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { GameModesComponent } from '../components/game-modes/game-modes.component';
import { ListaPartidasComponent } from '../components/lista-partidas/lista-partidas.component';
import { OptionsComponent } from '../components/options/options.component';
import { OptionsAdminComponent } from '../components/options-admin/options-admin.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-initial-menu',
  templateUrl: './initial-menu.page.html',
  styleUrls: ['./initial-menu.page.scss'],
})
export class InitialMenuPage implements OnInit {

    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll
    photo;
    username = "Juan"; //Leer de la sesión
    coins;
    admin=true;
    data: any[] = Array(3);
    component: ListaPartidasComponent; 
    constructor( private popoverCtrl: PopoverController, public router: Router) { }
    getData() {
      this.coins=1000; //Leer de la bbdd a partir del username
      this.photo="../../assets/icon/a.jpg";
    };
    ngOnInit() {
      this.getData();
    }

    async chooseOptions() {
      const popover = await this.popoverCtrl.create({
        component: GameModesComponent,
      });

      await popover.present();
    }

    async settings() {
      
      if(this.admin){
        const popover = await this.popoverCtrl.create({
          component: OptionsAdminComponent,
        });

        await popover.present(); 
      }
      else
      {
        const popover = await this.popoverCtrl.create({
          component: OptionsComponent,
        });
        
        await popover.present();
      }

      
    }
    
    moveToShop(){
      this.router.navigate(['shop']);
    }
  }
