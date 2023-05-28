import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonImg, IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { WorkflowService } from 'src/app/services/workflow.service';
import { WorkTypeService } from 'src/app/services/worktype.service';
import { ActivatedRoute } from '@angular/router';
import { CustomToast } from 'src/app/common/customtoast';
import { Camera, CameraResultType } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

const IMAGE_DIR = 'stored-images';
interface LocalFile {
  name: string,
  path: string,
  data: string
}

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
  providers: [CustomToast],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkflowComponent implements OnInit {
  formWorkflow: FormGroup;
  workTypes: any = [];
  file: File
  imageFile: any;
  @Output() onWorkCompleted: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() siteId: Number;
  message: string = '';
  color: string = '';
  isSubmitted: boolean = false;
  isReportSite: boolean = false;
  imgPreview: any;
  fileRequest: Blob;
  localFile: LocalFile;
  loadingElement: HTMLIonLoadingElement;


  constructor(private formBuilder: FormBuilder, private workTypeService: WorkTypeService, private workflowService: WorkflowService, private customToast: CustomToast, private route: ActivatedRoute, private loadingCtrl: LoadingController) {
    defineCustomElements(window);
    route.params.subscribe(val => {
      this.formWorkflow = this.formBuilder.group({
        workTypeId: ['', Validators.required],
        documentDescription: ['', Validators.required],
        uploadDocument: ['',],
        isSiteReportedIssue: true,
        isWorkCompleted: false,
        comment: ['', Validators.required]
      });
      this.getAllWorkTypes();
    });
  }

  ngOnInit() { }

  async onSaveWorkflow() {

    let request = new FormData();
    if (this.formWorkflow.value.workTypeId != 0 && this.formWorkflow.value.documentDescription.trim() != "") {
      request.append("docPath", this.file, this.file.name);
      request.append("workTypeId", this.formWorkflow.value.workTypeId);
      request.append("documentDescription", this.formWorkflow.value.documentDescription.trim());
      request.append("isSiteReportedIssue", "0");
      request.append("isWorkCompleted", "1");
      request.append("siteId", this.siteId.toString());
      this.showLoading();
      try {
        let response = await this.workflowService.saveWorkflow(request).toPromise();
        this.loadingElement.dismiss();
        if (response.success) {
          this.isSubmitted = true;
          this.onWorkCompleted.emit(true);
          this.message = "Site work completed.";
        }
        else {
          this.message = "Error occured while completing site work.";
        }
      }
      catch
      {

      }
      finally {
        this.loadingElement.dismiss();
      }
    }
    else {
      this.message = "All fields are mandatory.";
    }
    this.customToast.displayToast(this.message);
  }

  openReportSiteDiv() {
    this.isReportSite = true;
    this.isSubmitted = true;
  }
  closeReportSiteDiv() {
    this.isReportSite = false;
    this.isSubmitted = false;
  }

  async onReportSite() {
    let request = {
      siteId: this.siteId,
      isSiteReportedIssue: 1,
      comment: this.formWorkflow.value.comment.trim(),
    }
    if (request.comment != "") {
      let response = await this.workflowService.reportIssue(request).toPromise();
      if (response.success) {
        this.isReportSite = false;
        this.isSubmitted = true;
        this.onWorkCompleted.emit(true);
        this.message = "Site issue reported.";
      }
      else {
        this.message = "Error occured while reporting site.";
      }
    }
    else {
      this.message = "Report comment is mandatory.";
    }
    this.customToast.displayToast(this.message);
  }
  async onFileChange(fileChangeEvent: any) {
    this.file = fileChangeEvent.target.files[0];
    console.log(this.file);
  }
  async getAllWorkTypes() {
    await this.workTypeService.getAllWorkTypes().subscribe((response: any) => {
      this.workTypes = response.data;
    });
  }
  get errorControl() {
    return this.formWorkflow.controls;
  }
  async onCameraOpen() {
    const image = await Camera.getPhoto({
      saveToGallery: true,
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });
    var imageUrl = image.webPath;
    this.imgPreview = imageUrl;
    this.imageFile = image;
    let fileData = `data:image/jpeg;base64,${image.base64String}`;
    this.convertToBlob(fileData);
  }
  async convertToBlob(fileData: string) {
    const response = await fetch(fileData);
    const blobFile = await response.blob();

    this.file = new File([blobFile], "siteworksImage.jpeg", {
      type: "image/jpeg"
    });
  }
  async showLoading() {
    this.loadingElement = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    this.loadingElement.present();
  }
}


