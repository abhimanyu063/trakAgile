import { Injectable, Injector } from "@angular/core";
import { ApiHttpService } from "./ApiHttpService.services";
import { AppConfig } from "../appconfig";

@Injectable()
export class WorkflowService {
    constructor(private injector: Injector) {

    }
    saveWorkflow(data: any): any {
        const apiService = this.injector.get(ApiHttpService);
        return apiService.post(AppConfig.apiBaseUrl + "/siteworks/addSiteWork", data);
    }
    reportIssue(data: any): any {
        const apiService = this.injector.get(ApiHttpService);
        return apiService.post(AppConfig.apiBaseUrl + "/siteWorks/reportIssue", data);
    }
}