import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { WorkflowService } from 'src/app/services/workflow.service';
import { WorkTypeService } from 'src/app/services/worktype.service';
import { AppConfig } from 'src/app/appconfig';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkflowComponent implements OnInit {
  formWorkflow: FormGroup;
  workTypes: any = [];
  file: File
  @Output() onWorkCompleted: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() siteId: Number;
  message: string = '';
  color: string = '';

  constructor(private formBuilder: FormBuilder, private workTypeService: WorkTypeService, private workflowService: WorkflowService, private toastController: ToastController) { }

  ngOnInit() {
    this.formWorkflow = this.formBuilder.group({
      workTypeId: ['', Validators.required],
      documentDescription: ['', Validators.required],
      uploadDocument: ['', Validators.required],
      isSiteReportedIssue: true,
      isWorkCompleted: false
    });
    this.getAllWorkTypes();
  }
  async onSaveWorkflow() {
    let request = new FormData();
    if (this.file != undefined && this.formWorkflow.value.workTypeId != 0 && this.formWorkflow.value.documentDescription != "") {
      request.append("docPath", this.file, this.file.name);
      request.append("workTypeId", this.formWorkflow.value.workTypeId);
      request.append("documentDescription", this.formWorkflow.value.documentDescription);
      request.append("isSiteReportedIssue", "0");
      request.append("isWorkCompleted", "1");
      request.append("siteId", this.siteId.toString());

      let response = await this.workflowService.saveWorkflow(request).toPromise();
      console.log("response", response);
      this.onWorkCompleted.emit(true);
      this.message = "Document has been uploaded.";
      this.displayToast();
    }
    else {
      this.message = "All fields are mandatory.";
      this.displayToast();
    }

  }
  async onFileChange(fileChangeEvent: any) {

    this.file = fileChangeEvent.target.files[0];
  }
  async getAllWorkTypes() {
    await this.workTypeService.getAllWorkTypes().subscribe((response: any) => {
      this.workTypes = response.data;
    });
  }
  get errorControl() {
    return this.formWorkflow.controls;
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
