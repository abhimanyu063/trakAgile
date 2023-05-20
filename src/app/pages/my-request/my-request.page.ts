import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RequestComponent } from 'src/app/components/request/request.component';
import { RequestService } from 'src/app/services/request.service';
import { ApiHttpService } from 'src/app/services/ApiHttpService.services';
import { HttpClientModule } from '@angular/common/http';
import { requestModel } from 'src/app/models/request.model';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-request',
  templateUrl: './my-request.page.html',
  styleUrls: ['./my-request.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RequestComponent, HttpClientModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [RequestService, ApiHttpService, SharedService]
})
export class MyRequestPage implements OnInit {
  requests: Array<requestModel>;
  userId: Number = 0;

  constructor(private requestService: RequestService, private sharedService: SharedService, private router: Router, private route: ActivatedRoute) {
    route.params.subscribe(val => {
      this.userId = Number(this.sharedService.getUserId());
      this.onGetRequests(this.userId);
    });
  }

  ngOnInit() { }

  onRequestAdd() {
    this.router.navigate(['/add-request']);
  }
  onGetRequests(userId: Number) {
    this.requests = new Array<requestModel>();
    this.requestService.getRequests(userId).subscribe((response: any) => {
      response.data.forEach((element: any) => {
        this.requests.push({
          approvedByUserId: element.approvedByUserId,
          approvedByUserName: element.approvedByUserName,
          createdOn: element.createdOn,
          isApproved: element.isApproved,
          requestComment: element.requestComment,
          requestDate: element.requestDate,
          requestId: element.requestId,
          requestTypeDescription: element.requestTypeDescription,
          requestTypeId: element.requestTypeId,
          userId: element.userId
        });
      });
    });
  }
}
