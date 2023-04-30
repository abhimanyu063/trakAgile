import { CommonModule } from '@angular/common';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DistrictService } from 'src/app/services/district.service';
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

  constructor(private formBuilder:FormBuilder, private siteService:SiteService, 
    private districtService:DistrictService, private siteTypeService:SiteTypeService) { 
  }

  ngOnInit() {
    this.siteForm=this.formBuilder.group({
      siteName:['',],
      siteVillegeName:[''],
      sitetypeID:[''],
      districtId:[''],
      tripTypeId:['']
    });
    this.getAllDistrict();
    this.getAllSiteTypes();
  }
  async onSiteAdd()
  {
    console.log(this.siteForm.value);
    let response=await this.siteService.addSite(this.siteForm.value);
    console.log(response);
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
