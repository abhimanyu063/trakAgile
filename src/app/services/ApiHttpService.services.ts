import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { map, Observable } from 'rxjs';
@Injectable() 
export class ApiHttpService { 
constructor(private http: HttpClient 
) { } 
public get(url: string, options?: any) { 
return this.http.get(url, options); 
} 
public post(url: string, data: any, options?: any):Observable<any> 
{ 
return this.http.post(url, data, options).pipe(
    map(
        result=>{
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