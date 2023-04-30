import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { TripService } from 'src/app/services/trip.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiHttpService } from 'src/app/services/ApiHttpService.services';
import { AddSiteComponent } from 'src/app/components/add-site/add-site.component';
import { SiteService } from 'src/app/services/site.service';
import { DistrictService } from 'src/app/services/district.service';
import { SiteTypeService } from 'src/app/services/sitetype.service';
import { BrowserModule } from '@angular/platform-browser';
import { WorkflowComponent } from 'src/app/components/workflow/workflow.component';
import { WorkTypeService } from 'src/app/services/worktype.service';
import { WorkflowService } from 'src/app/services/workflow.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, AddSiteComponent, WorkflowComponent],
  providers:[TripService, ApiHttpService, SiteService, DistrictService, SiteTypeService, WorkTypeService, WorkflowService, SharedService],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class HomePage implements OnInit {
  isTripStarted: boolean=false;
  userName:string=''
  userId:Number=0
  public alertButtons = ['OK'];
  isSiteAdded:boolean=false;
  tripId:Number;
  
  constructor(private tripService:TripService, private sharedService:SharedService) { }

  ngOnInit() {
    this.userName=this.sharedService.getName();
    this.userId=this.sharedService.getUserId();
  }
  async onTripStarted(){
    let tripObject={
      userId:this.userId,
      isTripStarted:1,
      isTripEnded:0,
      isWorkCompleted:0,
      latitude:10.466464,
      longitude:10.466464,
    }
    let response=await this.tripService.addTrip(tripObject);
    this.tripId=response.data.insertId;
    this.isTripStarted=true;
    // const coordinates=await Geolocation.getCurrentPosition().then((position)=>{
    //   console.log(position);
    // });
  }
  async onTripEnded(){
    let tripObject={
      userId:this.userId,
      isTripStarted:1,
      isTripEnded:0,
      isWorkCompleted:0,
      latitude:10.466464,
      longitude:10.466464,
    }
    let response=await this.tripService.addTrip(tripObject);
    this.isTripStarted=true;
    // const coordinates=await Geolocation.getCurrentPosition().then((position)=>{
    //   console.log(position);
    // });
  }
  onSiteAdded(event:any)
  {
    this.isSiteAdded=event;
  }
}