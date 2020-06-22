import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { SharedModule } from './com/annaniks/marathon/shared/shared.module';
import { ApiInterceptor } from './com/annaniks/marathon/core/interceptore/api.interceptor';
import { AuthUserService } from './com/annaniks/marathon/core/services/auth.services';

import { environment } from 'src/environments/environment';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";


import { CookieModule } from 'ngx-cookie';

let config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('521112195089951'),
  },
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("378578336151-2e84bss75kp699ivffbprtslmv7a8pk2.apps.googleusercontent.com")
  },

]);


export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SocialLoginModule,
    CookieModule.forRoot()
    
  ],
  providers: [
    {
      provide: 'BASE_URL',
      useValue: environment.apiUrl,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    AuthUserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
