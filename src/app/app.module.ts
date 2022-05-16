import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RemoteServiceSignUp } from './sign-up/remote-service.service';
import { LoginService } from './login/login.service';
import { ShopService } from './shop/shop.service';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

const config: SocketIoConfig = {url: 'http://localhost:3001', options: {}};
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, SocketIoModule.forRoot(config)],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, RemoteServiceSignUp, LoginService,
    ShopService, ScreenOrientation],
  bootstrap: [AppComponent],
})
export class AppModule {}
