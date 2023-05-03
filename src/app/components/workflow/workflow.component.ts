import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WorkflowService } from 'src/app/services/workflow.service';
import { WorkTypeService } from 'src/app/services/worktype.service';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss'],
  standalone:true,
  imports:[IonicModule,ReactiveFormsModule, CommonModule], 
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkflowComponent  implements OnInit {
  formWorkflow:FormGroup;
  workTypes:any=[];
  file:File

  constructor(private formBuilder:FormBuilder, private workTypeService:WorkTypeService, private workflowService:WorkflowService) { }

  ngOnInit() {
    this.formWorkflow=this.formBuilder.group({
      workTypeId:[''],
      documentDescription:[''],
      uploadDocument:[''],
      isSiteReportedIssue:true,
      isWorkCompleted:false
    });
    this.getAllWorkTypes();
  }
  async onSaveWorkflow()
  {
    let request= new FormData();
    request.append("docPath", this.file, this.file.name);
    request.append("workTypeId", this.formWorkflow.value.workTypeId);
    request.append("documentDescription", this.formWorkflow.value.documentDescription);
    request.append("isSiteReportedIssue", "0");
    request.append("isWorkCompleted", "1");
    
    let response=await this.workflowService.saveWorkflow(request).toPromise();
    console.log(response);

  }
  async onFileChange(fileChangeEvent:any)
  {
 
    this.file=fileChangeEvent.target.files[0];
    console.log(this.file);
  }
  async getAllWorkTypes()
  {
    await this.workTypeService.getAllWorkTypes().subscribe((response:any)=>{
      this.workTypes=response.data;
    });
  }

}
