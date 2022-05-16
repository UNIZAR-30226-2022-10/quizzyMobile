import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameOptionsComponent } from './game-options/game-options.component';
import { GameModesComponent } from './game-modes/game-modes.component';
import { GameSettingsComponent } from './game-settings/game-settings.component';
import { ListaPartidasComponent } from './lista-partidas/lista-partidas.component';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from './footer/footer.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { IntroduceCodeComponent } from "./introduce-code/introduce-code.component"  
import { ProgressbarComponent } from './progressbar/progressbar.component';  
import { CreateJoinComponent } from './create-join/create-join.component';  
import { MbscModule } from '@mobiscroll/angular';
import { OptionsComponent } from './options/options.component';
import { OptionsAdminComponent } from './options-admin/options-admin.component';



@NgModule({
  declarations: [
    GameOptionsComponent,
    GameModesComponent,
    GameSettingsComponent,
    ListaPartidasComponent,
    ProgressbarComponent,
    FooterComponent,
    CreateJoinComponent,
    IntroduceCodeComponent,
    OptionsAdminComponent,
    OptionsComponent
  ],
  exports: [
    ListaPartidasComponent,
    FooterComponent,
    ProgressbarComponent,
    GameOptionsComponent,
    GameModesComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    MatProgressBarModule,
    MbscModule
  ]
})
export class ComponentsModule { }
