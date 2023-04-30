import { Injectable, Injector } from "@angular/core";
import { ApiHttpService } from "./ApiHttpService.services";
import { AppConfig } from "../appconfig";

@Injectable()
export class RequestService{
    constructor(private injector: Injector)
    {
    }
    addRequest(data: any): any {
        const apiService = this.injector.get(ApiHttpService);
        return apiService.post(AppConfig.apiBaseUrl + "requests/addRequest", data).toPromise();
    }
    getRequests(userId:Number):any
    {
        const apiService = this.injector.get(ApiHttpService);
        return apiService.get(AppConfig.apiBaseUrl + "requests/getRequestsByUserId/"+userId+"");
    }
}