import { Injectable, Injector } from "@angular/core";
import { ApiHttpService } from "./ApiHttpService.services";
import { AppConfig } from "../appconfig";

@Injectable()
export class UserService {
    isSuccess: boolean;
    constructor(private injector: Injector) {

    }
    saveCustomer(data: any): any {
        const apiService = this.injector.get(ApiHttpService);
        return apiService.post(AppConfig.apiBaseUrl + "customers", data).toPromise();
    }
    validateCustomer(data: any): any {
        const apiService = this.injector.get(ApiHttpService);
        return apiService.post(AppConfig.apiBaseUrl + "users/validateAndGetUser", data);
    }
    changePassword(data: any): any {
        
        const apiService = this.injector.get(ApiHttpService);
        return apiService.post(AppConfig.apiBaseUrl + "users/changePassword", data).toPromise();
    }
}