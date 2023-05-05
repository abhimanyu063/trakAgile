import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
@Injectable()
export class ApiHttpService {
    options:any;
    constructor(private http: HttpClient
    ) {
        var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        headers_object.append("Authorization", "Basic " + btoa("TrakAgile:TrakAgile@1234"));
        this.options = {
            headers: headers_object
        };
    }
    public get(url: string, options?: any) {
        return this.http.get(url, this.options);
    }
    public post(url: string, data: any, options?: any): Observable<any> {
        return this.http.post(url, data, options).pipe(
            map(
                result => {
                    return result;
                }
            ));
    }
    public put(url: string, data: any, options?: any) {
        return this.http.put(url, data, options);
    }
    public delete(url: string, options?: any) {
        return this.http.delete(url, options);
    }
}