import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonDatetime, IonicModule, ToastController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared.service';
import { RequestTypeService } from 'src/app/services/requesttype.service';
import { ApiHttpService } from 'src/app/services/ApiHttpService.services';
import { HttpClientModule } from '@angular/common/http';
import { RequestService } from 'src/app/services/request.service';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/appconfig';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.page.html',
  styleUrls: ['./add-request.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [RequestTypeService, SharedService, ApiHttpService, RequestService]
})
export class AddRequestPage implements OnInit {
  requestForm: FormGroup;
  userId: Number = 0;
  requestTypes: any[];
  dateValue: Date;
  @ViewChild("datetime") datetime: IonDatetime;
  isPopoverOpen: boolean = false;
  requestDate: any;
  message: string = '';
  color: string = '';

  constructor(private formBuilder: FormBuilder, private sharedService: SharedService, private requestTypeService: RequestTypeService, private requestService: RequestService, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
    this.userId = Number(this.sharedService.getUserId());
    this.requestForm = this.formBuilder.group({
      requestComment: ['', Validators.required],
      requestTypeId: ['', Validators.required],
      userId: this.userId,
      //requestDate: [this.requestDate],
      requestDate: ['', Validators.required],

    });
    this.onGetAllRequestTypes();
  }
  async onRequestAdd() {
    let request = {
      requestComment: this.requestForm.value.requestComment.trim(),
      requestTypeId: this.requestForm.value.requestTypeId,
      userId: this.userId,
      requestDate: this.requestDate
    }
    if (request.requestComment != "" && request.requestDate != undefined && request.requestTypeId != 0) {
      const response = await this.requestService.addRequest(request);
      if (response.success) {
        this.router.navigate(['/my-request']);
        this.message = "Request has been added.";
      }
      else {
        this.message = "Error occured while adding request.";
      }
    }
    else {
      this.message = "All fields are mandatory.";
    }
    this.displayToast();
  }
  checkVal(event: any) {
    console.log(event)
  }
  onGetAllRequestTypes() {
    this.requestTypeService.getAllRequestTypes().subscribe((response: any) => {
      this.requestTypes = response.data;
    });
  }
  onDateSelect(event: any) {
    this.isPopoverOpen = false;
  }
  setPreferredDate(value: any) {
    this.requestDate = value?.slice(0, 10);
  }
  onRequestDateClicked() {
    this.isPopoverOpen = true;
  }
  get errorControl() {
    return this.requestForm.controls;
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
