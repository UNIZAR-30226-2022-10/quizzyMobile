import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescriptionComponent } from './description/description.component';
import { TrainResumeComponent } from './train-resume/train-resume.component';
import { GameOptionsComponent } from './game-options/game-options.component';
import { GameModesComponent } from './game-modes/game-modes.component';
import { GameSettingsComponent } from './game-settings/game-settings.component';
import { ListaPartidasComponent } from './lista-partidas/lista-partidas.component';
import { ListaPartidasNtComponent } from './lista-partidas-nt/lista-partidas-nt.component';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from './footer/footer.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { IntroduceCodeComponent } from "./introduce-code/introduce-code.component"  
import { ProgressbarComponent } from './progressbar/progressbar.component';  
import { CreateJoinComponent } from './create-join/create-join.component';  
import { MbscModule } from '@mobiscroll/angular';
import { OptionsComponent } from './options/options.component';
import { OptionsAdminComponent } from './options-admin/options-admin.component';
import { DiceComponent } from './dice/dice.component';
import { TokensCardComponent } from './tokens-card/tokens-card.component';



@NgModule({
  declarations: [
    GameOptionsComponent,
    GameModesComponent,
    GameSettingsComponent,
    ListaPartidasComponent,
    ListaPartidasNtComponent,
    ProgressbarComponent,
    FooterComponent,
    CreateJoinComponent,
    IntroduceCodeComponent,
    OptionsAdminComponent,
    OptionsComponent,
    devPhaserBoard
    DiceComponent,
    TokensCardComponent
    DescriptionComponent,
    TrainResumeComponent
  ],
  exports: [
    ListaPartidasComponent,
    ListaPartidasNtComponent,
    FooterComponent,
    ProgressbarComponent,
    GameOptionsComponent,
    GameModesComponent,
    DiceComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    MatProgressBarModule,
    MbscModule
  ]
})
export class ComponentsModule { }
