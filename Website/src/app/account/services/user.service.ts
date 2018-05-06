
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {catchError} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { WebApiConnection, WebApiManagerService, ConnSource } from '../../web-api/services/web-api-manager.service';
import { Oauth2Service } from '../../authentication/oauth2/services/oauth2.service';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
@Injectable()
export class UserService {

  private _ControllerPath = 'User';
  private _Conn: WebApiConnection = null;

  constructor(private http: HttpClient, private api: WebApiManagerService, private oauth2: Oauth2Service) {
    this._Conn = this.api.GetWebApiConnection(ConnSource.ResourceServer);

  }


  GetUserName(): Observable<string> {
    const url: string = this._Conn.GetWebApiUrl(this._ControllerPath, 'GetUserName');
    return this.http.post<string>(url, null, { headers: this._Conn.GetHttpHeader(this.oauth2.GetAuthorization()) }).pipe(
      catchError((err: Response) => {
        return observableThrowError(err);
      }));
  }



}
