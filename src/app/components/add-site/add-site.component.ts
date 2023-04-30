import { CommonModule } from '@angular/common';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { siteModel } from 'src/app/models/site.model';
import { DistrictService } from 'src/app/services/district.service';
import { SharedService } from 'src/app/services/shared.service';
import { SiteService } from 'src/app/services/site.service';
import { SiteTypeService } from 'src/app/services/sitetype.service';


@Component({
  selector: 'app-add-site',
  templateUrl: './add-site.component.html',
  styleUrls: ['./add-site.component.scss'],
  standalone:true,
  imports:[IonicModule,ReactiveFormsModule, CommonModule], 
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AddSiteComponent  implements OnInit {
  siteForm:FormGroup;
  districts:any=[];
  siteTypes:any=[];
  userId:Number;
  @Output() onSiteAdded:EventEmitter<boolean>= new EventEmitter<boolean>();
  @Input() tripId:Number;

  constructor(private formBuilder:FormBuilder, private siteService:SiteService, 
    private districtService:DistrictService, private siteTypeService:SiteTypeService, 
    private shareService:SharedService) { 
  }

  ngOnInit() {
    this.siteForm=this.formBuilder.group({
      siteName:[''],
      siteVillageName:[''],
      siteTypeId:[''],
      districtId:[''],
      tripTypeId:['']
    });
    this.userId=Number(this.shareService.getUserId());
    this.getAllDistrict();
    this.getAllSiteTypes();
  }
  async onSiteAdd()
  {
    let siteModel={
      siteName:this.siteForm.value.siteName,
      siteVillageName:this.siteForm.value.siteVillageName,
      siteTypeId:this.siteForm.value.siteTypeId,
      districtId:this.siteForm.value.districtId,
      tripTypeId:Number(this.siteForm.value.tripTypeId),
      userId:this.userId,
      latitude:10.666666,
      longitude:10.666666,
      tripId:this.tripId
    }
    let response=await this.siteService.addSite(siteModel);
    this.onSiteAdded.emit(response.success);
  }
  async getAllDistrict()
  {
    this.districtService.getAllDistrict().subscribe((response:any)=>{
      this.districts=response.data;
    });
  }
  async getAllSiteTypes()
  {
    this.siteTypeService.getAllSiteType().subscribe((response:any)=>{
      this.siteTypes=response.data;
      console.log(this.siteTypes);
    });
  }
}
