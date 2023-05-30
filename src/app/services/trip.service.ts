import { Injectable, Injector } from "@angular/core";
import { ApiHttpService } from "./ApiHttpService.services";
import { AppConfig } from "../appconfig";

@Injectable()
export class TripService{
    constructor(private injector: Injector)
    {

    }
    addTrip(data: any): any {
        const apiService = this.injector.get(ApiHttpService);
        return apiService.post(AppConfig.apiBaseUrl + "trips/addTrip", data).toPromise();
    }
    endTrip(data: any): any {
        const apiService = this.injector.get(ApiHttpService);
        return apiService.post(AppConfig.apiBaseUrl + "trips/updateTrip", data).toPromise();
    }
    getTripById(userId: any): any {
        const apiService = this.injector.get(ApiHttpService);
        return apiService.get(AppConfig.apiBaseUrl + "trips/getTripsById/"+userId+"");
    }
    onLocationTrack(data: any): any {
        const apiService = this.injector.get(ApiHttpService);
        return apiService.post(AppConfig.apiBaseUrl + "sites/addLocation", data).toPromise();
    }
}