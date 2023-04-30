import { Injectable, Injector } from "@angular/core";
import { ApiHttpService } from "./ApiHttpService.services";
import { AppConfig } from "../appconfig";

@Injectable()
export class SiteTypeService{

    constructor(private injector: Injector)
    {

    }
    getAllSiteType(): any {
        const apiService = this.injector.get(ApiHttpService);
        return apiService.get(AppConfig.apiBaseUrl + "/sitetypes/getSiteTypes");
    }
}