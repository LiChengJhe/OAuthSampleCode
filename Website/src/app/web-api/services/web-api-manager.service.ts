import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';


export enum Protocol {
    http,
    https
}

export enum ConnSource {
    OAuth2Server,
    ResourceServer
}

export class WebApiConnection {
    private _Protocol: Protocol;
    private _Domain: string;
    private _PrefixPath: string;

    constructor(protocol: Protocol, domain: string, prefixPath: string) {
        this._Protocol = protocol;
        this._Domain = domain;
        this._PrefixPath = prefixPath;
    }

     GetOrigin(): string {
        return Protocol[this._Protocol] + '://' + this._Domain;
    }

     GetHttpHeader(authorization?: string): HttpHeaders {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        if (authorization) {
            headers = headers.append('Authorization',  authorization);
        }
        return headers;
    }

     GetWebApiUrl(controllerPath: string, actionName: string): string {
        let url: string = Protocol[this._Protocol] + '://' + this._Domain + '/';
        if (this._PrefixPath != null) {
            url += this._PrefixPath + '/';
        }
        url += controllerPath + '/' + actionName;
        return url;
    }
}

@Injectable()
export class WebApiManagerService {
    private _Conns: Map<ConnSource, WebApiConnection> = new Map<ConnSource, WebApiConnection>();
    constructor() {
      this._Conns.set(ConnSource.OAuth2Server, new WebApiConnection(Protocol.http, 'localhost:11625', 'OAuth2'));
      this._Conns.set(ConnSource.ResourceServer, new WebApiConnection(Protocol.http, 'localhost:58982', 'api'));

    }

    public GetWebApiConnection(connSource: ConnSource): WebApiConnection {
        return this._Conns.get(connSource);
    }

}
