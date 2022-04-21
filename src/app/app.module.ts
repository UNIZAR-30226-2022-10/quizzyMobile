import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RemoteServiceSignUp } from './sign-up/remote-service.service';
import { LoginService } from './login/login.service';

const config: SocketIoConfig = {url: 'http://localhost:3000', options: {}};
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, SocketIoModule.forRoot(config)],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, RemoteServiceSignUp, LoginService],
  bootstrap: [AppComponent],
})
export class AppModule {}
