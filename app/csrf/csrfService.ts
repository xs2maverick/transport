import {Headers, Http} from 'angular2/http';
import {Inject} from 'angular2/core';

export class CsrfService {
    headerName:string;
    headerValue:string;
    http:Http;
    headUrl:string;
    
    constructor(http:Http, headUrl:string) {
        this.http = http;
        this.headUrl = headUrl;
        this.http.head(headUrl)
            .subscribe(
                data=> {
                    console.log(data.headers.keys());
                    this.headerName = data.headers.get('X-CSRF-HEADER');
                    this.headerValue = data.headers.get('X-CSRF-TOKEN');
                    console.log("Header name: " + this.headerName + " headerValue: " + this.headerValue);
                }
            );
    }
    
    setCsrfInfo(name:string, value:string) {
        this.headerName = name;
        this.headerValue = value;
    }
    
    getHeaderName():string {
        return this.headerName;
    }
    
    getHeaderValue():string {
        return this.headerValue;
    }
    
    addCsrfHeader(headers:Headers) {
        headers.append(this.headerName, this.headerValue);
    }
}