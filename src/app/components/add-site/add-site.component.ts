import { CommonModule } from '@angular/common';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { DistrictService } from 'src/app/services/district.service';
import { SharedService } from 'src/app/services/shared.service';
import { SiteService } from 'src/app/services/site.service';
import { SiteTypeService } from 'src/app/services/sitetype.service';
import { AppConfig } from 'src/app/appconfig';

@Component({
  selector: 'app-add-site',
  templateUrl: './add-site.component.html',
  styleUrls: ['./add-site.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AddSiteComponent implements OnInit {
  siteForm: FormGroup;
  districts: any = [];
  siteTypes: any = [];
  userId: Number;
  @Output() onSiteAdded: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSiteId: EventEmitter<Number> = new EventEmitter<Number>();
  @Input() tripId: Number;
  message: string = '';
  color: string = '';

  constructor(private formBuilder: FormBuilder, private siteService: SiteService,
    private districtService: DistrictService, private siteTypeService: SiteTypeService,
    private shareService: SharedService, private toastController: ToastController) {
  }

  ngOnInit() {
    this.siteForm = this.formBuilder.group({
      siteName: ['', Validators.required],
      siteVillageName: ['', Validators.required],
      siteTypeId: ['', Validators.required],
      districtId: ['', Validators.required],
      tripTypeId: ['', Validators.required]
    });
    this.userId = Number(this.shareService.getUserId());
    this.getAllDistrict();
    this.getAllSiteTypes();
  }
  async onSiteAdd() {
    let siteModel = {
      siteName: this.siteForm.value.siteName.trim(),
      siteVillageName: this.siteForm.value.siteVillageName.trim(),
      siteTypeId: this.siteForm.value.siteTypeId,
      districtId: this.siteForm.value.districtId,
      tripTypeId: Number(this.siteForm.value.tripTypeId),
      userId: this.userId,
      latitude: 12.971648,
      longitude: 77.749939,
      tripId: this.tripId
    }
    if (siteModel.tripTypeId != 0 && siteModel.districtId != 0 && siteModel.siteTypeId != 0 && siteModel.latitude != undefined
      && siteModel.longitude != undefined && siteModel.siteName != "" && siteModel.siteVillageName != "") {
      let response = await this.siteService.addSite(siteModel);
      if (response.success) {
        this.onSiteAdded.emit(response.success);
        this.onSiteId.emit(response.data.insertId);
        this.message = "Site has been added.";
      }
      else {
        this.message = "Error occured while adding site.";
      }
    }
    else {
      this.message = "All fields are mandatory.";
    }
    this.displayToast();
  }
  async getAllDistrict() {
    this.districtService.getAllDistrict().subscribe((response: any) => {
      this.districts = response.data;
    });
  }
  async getAllSiteTypes() {
    this.siteTypeService.getAllSiteType().subscribe((response: any) => {
      this.siteTypes = response.data;
    });
  }
  get errorControl() {
    return this.siteForm.controls;
  }
  displayToast() {
    this.toastController.create({
      //header: 'Welcome!',
      message: this.message,
      color: ".textbackground",
      position: 'bottom',
      cssClass: 'toast-custom-class',
      buttons: [
        {
          side: 'end',
          text: 'Close',
          role: 'cancel',
          handler: () => { }
        }
      ]
    }).then((toast) => {
      toast.present();
    }).then(() => {
      setTimeout(() => this.toastController.dismiss(), AppConfig.toastDuration)
    });
  }
}
