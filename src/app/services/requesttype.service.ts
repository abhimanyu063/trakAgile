import { Injectable, Injector } from "@angular/core";
import { ApiHttpService } from "./ApiHttpService.services";
import { AppConfig } from "../appconfig";

@Injectable()
export class RequestTypeService{
    constructor(private injector: Injector)
    {

    }
    getAllRequestTypes(): any {
        const apiService = this.injector.get(ApiHttpService);
        return apiService.get(AppConfig.apiBaseUrl + "requestTypes/getRequestTypes");
    }
}