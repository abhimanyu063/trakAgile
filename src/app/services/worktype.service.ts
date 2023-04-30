import { Injectable, Injector } from "@angular/core";
import { ApiHttpService } from "./ApiHttpService.services";
import { AppConfig } from "../appconfig";

@Injectable()
export class WorkTypeService
{
    constructor(private injector: Injector)
    {

    }
    getAllWorkTypes(): any {
        const apiService = this.injector.get(ApiHttpService);
        return apiService.get(AppConfig.apiBaseUrl + "/worktypes/getWorkTypes");
    }
}