
import {timer as observableTimer ,  Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Oauth2Service } from '../../services/oauth2.service';
import { WebApiManagerService, ConnSource } from '../../../../web-api/services/web-api-manager.service';
import { UserService } from '../../../../account/services/user.service';

declare var toastr: any;
@Component({
  selector: 'app-oauth2-client-page',
  templateUrl: './oauth2-client-page.component.html',
  styleUrls: ['./oauth2-client-page.component.css']
})
export class Oauth2ClientPageComponent implements OnInit, OnDestroy {
  ExistToken: boolean;
  TokenTimerEvent: Subscription;
  constructor( private api: WebApiManagerService, private oauth2: Oauth2Service, private user: UserService) {
  }
  ngOnInit() {

    this.oauth2.ReceiveFragmentFromURL(window.location);
    this.RunTokenTimer();
  }
  RunTokenTimer(): void {
    this.TokenTimerEvent = observableTimer(0, 1000).subscribe(() => {
      if (this.oauth2.GetToken()) {
        this.ExistToken = true;
      } else {
        this.ExistToken = false;
      }
    });
  }
  OpenAuthenticationPage(): void {
    this.oauth2.OpenAuthenticationPage({
      ClientID: 'Angular Client',
      ServerURL: this.api.GetWebApiConnection(ConnSource.OAuth2Server).GetOrigin() + '/OAuth2/Authorize',
      RedirectURL: window.location.href,
      State: 'OAuth2',
      Scope: 'Assess Profile'
    });
  }
  Logout(): void {
    toastr.options = {
      positionClass: 'toast-bottom-right'
    };
    this.ExistToken = false;
    this.oauth2.RemoveFragmentFromCookie();
    toastr.success('Your account has been logout');
  }
  ngOnDestroy(): void {
    this.TokenTimerEvent.unsubscribe();
  }
  GetUserName(): void {
    this.user.GetUserName().subscribe(res => {
      toastr.options = {
        positionClass: 'toast-bottom-right'
      };
      toastr.success(res);
    });
  }
}

