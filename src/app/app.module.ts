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
import { AuthService } from './com/annaniks/marathon/core/services/auth.services';

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
    CookieService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
