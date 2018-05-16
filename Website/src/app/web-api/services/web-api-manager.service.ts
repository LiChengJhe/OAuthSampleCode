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
    private _Domain: string;
    private _PrefixPath: string;

    constructor(domain: string, prefixPath: string) {
        this._Domain = domain;
        this._PrefixPath = prefixPath;
    }

    GetOrigin(protocol?: Protocol): string {
        return Protocol[protocol ? protocol : Protocol.http] + '://' + this._Domain;
    }

    GetHttpHeader(authorization?: string): HttpHeaders {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        if (authorization) {
            headers = headers.append('Authorization', authorization);
        }
        return headers;
    }

    GetWebApiUrl(controllerPath: string, actionName: string, protocol?: Protocol): string {
        let url: string = Protocol[protocol ? protocol : Protocol.http] + '://' + this._Domain + '/';
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
        this._Conns.set(ConnSource.OAuth2Server, new WebApiConnection('localhost:11625', 'OAuth2'));
        this._Conns.set(ConnSource.ResourceServer, new WebApiConnection('localhost:58982', 'api'));

    }

    public GetWebApiConnection(connSource: ConnSource): WebApiConnection {
        return this._Conns.get(connSource);
    }

}
