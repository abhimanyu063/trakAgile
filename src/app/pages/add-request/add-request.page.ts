import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonDatetime, IonicModule } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared.service';
import { RequestTypeService } from 'src/app/services/requesttype.service';
import { ApiHttpService } from 'src/app/services/ApiHttpService.services';
import { HttpClientModule } from '@angular/common/http';
import { RequestService } from 'src/app/services/request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.page.html',
  styleUrls: ['./add-request.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers:[RequestTypeService, SharedService, ApiHttpService, RequestService]
})
export class AddRequestPage implements OnInit {
  requestForm: FormGroup;
  userId:Number=0;
  requestTypes:any[];
  public dateValue:any;
  @ViewChild("datetime") datetime:IonDatetime

  constructor(private formBuilder: FormBuilder, private sharedService:SharedService, private requestTypeService:RequestTypeService, private requestService:RequestService, private router:Router) { }

  ngOnInit() {
    this.userId=Number(this.sharedService.getUserId());
    this.requestForm= this.formBuilder.group({
      requestComment: [''],
      requestTypeId: [''],
      userId: this.userId,
      requestDate: "2023-05-20",
    });
    this.onGetAllRequestTypes();
  }
  async onRequestAdd() {
    const response=await this.requestService.addRequest(this.requestForm.value);    
    if(response.success)
    {
      this.router.navigate(['/my-request']);
    }
  }
  onGetAllRequestTypes()
  {
    this.requestTypeService.getAllRequestTypes().subscribe((response:any)=>{
      this.requestTypes=response.data;
    });
  }
  onDateSelect(event:any)
  {
    console.log(this.dateValue);
  }
  dateTimeUpdated()
  {
    
    
  }

}
