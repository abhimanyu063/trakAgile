import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { TripService } from 'src/app/services/trip.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiHttpService } from 'src/app/services/ApiHttpService.services';
import { AddSiteComponent } from 'src/app/components/add-site/add-site.component';
import { SiteService } from 'src/app/services/site.service';
import { DistrictService } from 'src/app/services/district.service';
import { SiteTypeService } from 'src/app/services/sitetype.service';
import { WorkflowComponent } from 'src/app/components/workflow/workflow.component';
import { WorkTypeService } from 'src/app/services/worktype.service';
import { WorkflowService } from 'src/app/services/workflow.service';
import { SharedService } from 'src/app/services/shared.service';
import { tripModel } from 'src/app/models/trip.model';
import { AppConfig } from 'src/app/appconfig';
import { ActivatedRoute, Router } from '@angular/router';
import { siteModel } from 'src/app/models/site.model';
import { CustomToast } from 'src/app/common/customtoast';
import { Capacitor, PluginListenerHandle, Plugins } from '@capacitor/core';
import { App } from '@capacitor/app';
import { BackgroundTask } from '@capawesome/capacitor-background-task';
import { ForegroundService } from '@awesome-cordova-plugins/foreground-service/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, AddSiteComponent, WorkflowComponent],
  providers: [TripService, ApiHttpService, SiteService, DistrictService, SiteTypeService, WorkTypeService, WorkflowService, SharedService, CustomToast, ForegroundService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {
  isTripStarted: boolean = false;
  isShowTripStartBtn: boolean = false;
  userName: string = ''
  userId: Number = 0
  isSiteAdded: boolean = false;
  tripId: Number;
  siteId: Number;
  message: string = '';
  isWorkCompleted: boolean = false;
  isProduction: boolean = false;
  appStateChangeListener: PluginListenerHandle | undefined;

  constructor(private tripService: TripService, private siteService: SiteService, private sharedService: SharedService, private router: Router, private customToast: CustomToast, private route: ActivatedRoute,
    public foregroundService: ForegroundService) {
    route.params.subscribe(val => {
      if (this.sharedService.getUserId() == null || this.sharedService.getUserId() == "") {
        this.router.navigate(['/customer-login']);
      }
      this.isTripStarted = false;
      this.isShowTripStartBtn = false;
      this.isSiteAdded = false;
      this.isWorkCompleted = false;
      this.isProduction = AppConfig.isProduction;
      this.userName = this.sharedService.getName();
      this.userId = this.sharedService.getUserId();
      this.loadSite();
    });
  }

  ngOnInit() {
    this.appStateChangeListener = App.addListener(
      'appStateChange',
      async ({ isActive }) => {
        if (isActive) {
          return;
        }
        const taskId = await BackgroundTask.beforeExit(async () => {
          await this.runTask();
          BackgroundTask.finish({ taskId });
        });
      },
    );
  }

  async onTripStarted() {
    this.startService();
    let latitude = "";
    let longitude = "";
    if (this.isProduction) {
      const coordinates = await Geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 10000 });
      latitude = coordinates.coords.latitude.toString();
      longitude = coordinates.coords.longitude.toString();
    }
    let tripObject = {
      userId: this.userId,
      isTripStarted: 1,
      isTripEnded: 0,
      isWorkCompleted: 0,
      latitude: latitude,
      longitude: longitude
    }
    let response = await this.tripService.addTrip(tripObject);
    if (response.success) {
      this.tripId = response.data.insertId;
      this.isShowTripStartBtn = false;
      this.isTripStarted = true;
      this.message = "Trip Started Successfully";
    }
    else {
      this.message = "Error occured while starting trip.";
    }
    this.customToast.displayToast(this.message);
  }
  async onTripEnded() {
    let latitude = "";
    let longitude = "";
    if (this.isProduction) {
      const coordinates = await Geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 10000 });
      latitude = coordinates.coords.latitude.toString();
      longitude = coordinates.coords.longitude.toString();
    }
    let tripObject = {
      tripId: this.tripId,
      isTripEnded: 1,
      isWorkCompleted: 1,
      endLatitude: latitude,
      endLongitude: longitude,
    }
    let response = await this.tripService.endTrip(tripObject);
    if (response.success) {
      this.isTripStarted = false;
      this.isShowTripStartBtn = true;
      this.isSiteAdded = false;
      this.isWorkCompleted = false;
      this.message = "Trip ended."
      this.router.navigate(['/home']);
    }
    else {
      this.message = "Error occured while ending trip."

    }
    this.customToast.displayToast(this.message);
  }
  onSiteAdded(event: any) {
    this.isSiteAdded = event;
  }
  onSiteId(event: any) {
    this.siteId = event;
  }
  onWorkCompleted(event: any) {
    this.isWorkCompleted = true;
  }
  loadSite() {
    let trips: Array<tripModel>;
    let sites: Array<siteModel>;
    this.tripService.getTripById(this.userId).subscribe((response: any) => {
      trips = response.data;
      let filteredTrips = trips.filter(x => x.isTripEnded == false);
      if (filteredTrips && filteredTrips.length > 0) {
        this.tripId = filteredTrips[filteredTrips.length - 1].tripId;

        this.siteService.getSites(this.userId).subscribe((response: any) => {
          sites = response.data;
          let filteredSites = sites.filter(x => x.isWorkCompleted == false && x.isSiteReportedIssue == false)
          if (filteredSites && filteredSites.length > 0) {
            this.isSiteAdded = true;
            this.siteId = filteredSites[filteredSites.length - 1].siteId;
            this.message = "Trip already started, site alredy added, please add site works.";
          }
          else {
            this.message = "Trip already started, please add site.";
          }
          this.customToast.displayToast(this.message);
          this.isTripStarted = true;
        });
      }
      else {
        this.isShowTripStartBtn = true;
      }
    });
  }
  private async runTask(): Promise<void> {
    console.log("Task Started");
    const taskDurationMs = 120000000;
    const end = new Date().getTime() + taskDurationMs;
    while (new Date().getTime() < end) {
      const isAppActive = await this.isAppActive();
      console.log("Is App Active", isAppActive);
      if (isAppActive) {
        break;
      }
      console.log('Background task still active.');
      if (this.isProduction) {
        const coordinates = await Geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 10000 });
        let latitude = coordinates.coords.latitude.toString();
        let longitude = coordinates.coords.longitude.toString();
        let data = {
          tripID: this.tripId,
          latitude: latitude,
          longitude: longitude
        }
        this.tripService.onLocationTrack(data);
      }
      await this.runInnerTask();
    }
  }

  private async runInnerTask(): Promise<void> {
    const taskDurationMs = 120000;
    const end = new Date().getTime() + taskDurationMs;
    while (new Date().getTime() < end) {
    }
  }

  private async isAppActive(): Promise<boolean> {
    const currentState = await App.getState();
    return currentState.isActive;
  }
  startService() {
    this.foregroundService.start('GPS Running', 'Background Service', 'drawable/fsicon');
    setInterval(()=>{
      this.onLocationTrack();
    }, 300000);
  }
  stopService() {
    // Disable the foreground service
    this.foregroundService.stop();
  }
  async onLocationTrack() {
    if (this.isProduction) {
      const coordinates = await Geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 10000 });
      let latitude = coordinates.coords.latitude.toString();
      let longitude = coordinates.coords.longitude.toString();
      let data = {
        tripID: this.tripId,
        latitude: latitude,
        longitude: longitude
      }
      this.tripService.onLocationTrack(data);
    }
  }
}