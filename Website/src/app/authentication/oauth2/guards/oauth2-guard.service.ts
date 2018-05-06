
import {timer as observableTimer,  Observable ,  Subscription } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Oauth2Service } from '../services/oauth2.service';
import { Oauth2Fragment } from '../models/oauth2-fragment';
import { WebApiManagerService, ConnSource } from '../../../web-api/services/web-api-manager.service';
declare var toastr: any;
@Injectable()
export class Oauth2GuardService implements CanActivate, OnDestroy {

  private _TokenTimer: Subscription = null;
  constructor(private router: Router, private api: WebApiManagerService, private oauth2: Oauth2Service) {

  }

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {

    toastr.options = {
      positionClass: 'toast-bottom-right'
    };

      const fragment: Oauth2Fragment =  this.oauth2.GetFragmentFromCookie();
      let isValid = false;
      if ( fragment) {
        isValid = true;
        if (!this._TokenTimer) {
          this._TokenTimer = observableTimer( (fragment.ExpiresIn * 1000) - (60 * 1000)).subscribe(() => {
            this.oauth2.OpenAuthenticationPage({
              ClientID: 'Angular Client',
              ServerURL: this.api.GetWebApiConnection(ConnSource.OAuth2Server).GetOrigin() + '/OAuth2/Authorize',
              RedirectURL: window.location.href,
              State: 'OAuth2',
              Scope: 'Assess Profile'
            });
          });
        }
      } else {
        toastr.error('Please Login !');
        this.router.navigateByUrl('/Authentication/Oauth2Client');
        isValid = false;
      }
      return isValid;
  }
  ngOnDestroy(): void {
    this._TokenTimer.unsubscribe();
  }
}
