import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './com/annaniks/marathon/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { ApiInterceptor } from './com/annaniks/marathon/core/interceptore/api.interceptor';
import { CookieService} from 'ngx-cookie-service';
import { AuthUserService } from './com/annaniks/marathon/core/services/auth.services';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

let config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('521112195089951'),
  },
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("549571475008-6h8o014lk4kcmjajeug8lmvhjr6aqgdh.apps.googleusercontent.com")
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
    SocialLoginModule

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
    CookieService,
    AuthUserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
