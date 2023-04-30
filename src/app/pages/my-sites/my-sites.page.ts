import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SiteComponent } from 'src/app/components/site/site.component';
import { SiteService } from 'src/app/services/site.service';
import { ApiHttpService } from 'src/app/services/ApiHttpService.services';
import { HttpClientModule } from '@angular/common/http';
import { siteModel } from 'src/app/models/site.model';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-my-sites',
  templateUrl: './my-sites.page.html',
  styleUrls: ['./my-sites.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SiteComponent, HttpClientModule],
  providers: [SiteService, ApiHttpService, SharedService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MySitesPage implements OnInit {
  sites: Array<siteModel>= new Array<siteModel>;
  userId:Number;

  constructor(private siteService: SiteService, private sharedService:SharedService) { }

  ngOnInit() {
    this.userId=this.sharedService.getUserId();
    this.getMySites(this.userId);
  }
  getMySites(userId:Number) {
    this.siteService.getSites(userId).subscribe((response: any) => {
      response.data.forEach((element:any) => {
        this.sites.push({
          siteName: element.siteName,
          siteTypeDescription: element.siteTypeDescription,
          siteVillageName: element.siteVillageName,
          createdOn: element.createdOn,
          districtName: element.districtName,
          sitetypeId: element.siteTypeId,
          userId: element.userId,
          latitude: element.latitude,
          longitude: element.longitude,
          districtId: element.districtId,
          tripTypeId: element.tripTypeId,
          tripTypeDescription: element.tripTypeDescription,
          tripId: element.tripId
        });
      });
    });
  }
}
