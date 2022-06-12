import { FormsModule } from '@angular/forms';
import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Socket, SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RemoteServiceSignUp } from './sign-up/remote-service.service';
import { LoginService } from './login/login.service';
import { ShopService } from './shop/shop.service';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { BoardService } from './board/board.service';
import { environment } from 'src/environments/environment';

const config: SocketIoConfig = {url: environment.backendUrl, options: {}};
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    FormsModule,
    MbscModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, SocketIoModule.forRoot(config)],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, RemoteServiceSignUp, LoginService, ShopService,
              ScreenOrientation, BoardService,  CookieService],

  bootstrap: [AppComponent],
})
export class AppModule {}
