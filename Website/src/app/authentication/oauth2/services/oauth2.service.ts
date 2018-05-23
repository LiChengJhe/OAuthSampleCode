import { Injectable, OnDestroy } from '@angular/core';
import { Oauth2ClientProp } from '../models/oauth2-client-prop';
import { TabProp } from '../models/tab-prop';
import { Oauth2Fragment } from '../models/oauth2-fragment';
declare var $: any;
@Injectable()
export class Oauth2Service implements OnDestroy {
  private _AccessToken: string;

  constructor() {
  }

  ngOnDestroy(): void {
  }

  GetToken(): string {
    if (!this._AccessToken) {
      const fragment: Oauth2Fragment = this.GetFragmentFromCookie();
      if (fragment) {
        this._AccessToken = fragment.AccessToken;
      }
    }
    return this._AccessToken;
  }
  ClearToken(): void {
    this._AccessToken = null;
    this.RemoveFragmentFromCookie();
  }
  GetAuthorization(): string {
    const fragment: Oauth2Fragment = this.GetFragmentFromCookie();
    return fragment.TokenType + ' ' + fragment.AccessToken;
  }
  GetQueryString(uri: string, params: any): string {
    let delimiter: string = (uri.indexOf('?') === -1) ? '?' : '&';
    // tslint:disable-next-line:forin
    for (const paramName in params) {
      const paramVal: string = params[paramName];
      uri += delimiter + encodeURIComponent(paramName) + '=' + encodeURIComponent(paramVal);
      delimiter = '&';
    }
    return uri;
  }
  SaveFragmentToCookie(fragment: Oauth2Fragment): void {
    $.cookie('Oauth2Fragment', JSON.stringify(fragment), { path: '/' });
  }
  GetFragmentFromCookie(): Oauth2Fragment {
    let fragment: Oauth2Fragment = null;
    if ($.cookie('Oauth2Fragment')) {
      fragment = JSON.parse($.cookie('Oauth2Fragment')) as Oauth2Fragment;
    }
    return fragment;
  }
  RemoveFragmentFromCookie(): void {
    $.removeCookie('Oauth2Fragment', { path: '/' });
  }
  ReceiveFragmentFromURL(location: Location): void {
    let fragm: any = null;

    if (location.hash.indexOf('#') === 0) {
      fragm = this.ParseQueryString(location.hash.substr(1));
    }

    if (fragm) {
      console.log(fragm);
      this.SaveFragmentToCookie({
        AccessToken: fragm.access_token,
        ExpiresIn: Number(fragm.expires_in),
        State: fragm.state,
        TokenType: fragm.token_type
      });
      window.close();
    }
  }
  OpenAuthenticationPage(clientProp: Oauth2ClientProp,
    tabProp: TabProp = {
      Title: 'Authorize', Height: 350, Width: 600,
      X_Axis: window.top.outerWidth / 2 + window.top.screenX - (600 / 2),
      Y_Axis: window.top.outerHeight / 2 + window.top.screenY - (350 / 2),
    }): Window {
    const url = this.GetQueryString(clientProp.ServerURL, {
      'client_id': clientProp.ClientID,
      'client_secret': clientProp.ClientSecret,
      'redirect_uri': clientProp.RedirectURL,
      'state': clientProp.State,
      'scope': clientProp.Scope,
      'response_type': 'token',
    });
    return window.open(url, tabProp.Title,
      'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no,' +
      'width=' + tabProp.Width + ', height=' + tabProp.Height + ', top=' + tabProp.Y_Axis + ', left=' + tabProp.X_Axis);
  }
  ParseQueryString(queryString: string): any {
    // tslint:disable-next-line:prefer-const
    let data: any = {};
    let pairs: any, pair: string, separatorIndex: number, key: string, value: string;
    if (queryString === null) {
      return data;
    }
    queryString = decodeURIComponent(queryString);
    pairs = queryString.split('&');
    for (let i = 0; i < pairs.length; i++) {
      pair = pairs[i];
      separatorIndex = pair.indexOf('=');
      if (separatorIndex === -1) {
        key = pair;
        value = null;
      } else {
        key = pair.substr(0, separatorIndex);
        value = pair.substr(separatorIndex + 1);
      }
      data[key] = value;
    }
    return data;
  }
}
