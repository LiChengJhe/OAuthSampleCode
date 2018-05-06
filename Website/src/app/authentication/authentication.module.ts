import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { Oauth2Service } from './oauth2/services/oauth2.service';
import { Oauth2ClientPageComponent } from './oauth2/pages/oauth2-client/oauth2-client-page.component';
import { WebApiManagerService } from '../web-api/services/web-api-manager.service';
import { UserService } from '../account/services/user.service';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AuthenticationRoutingModule
  ],
  providers: [WebApiManagerService , Oauth2Service, UserService],
  declarations: [Oauth2ClientPageComponent],
  exports: [Oauth2ClientPageComponent]
})
export class AuthenticationModule { }
