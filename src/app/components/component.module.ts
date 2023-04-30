import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { AddSiteComponent } from "./add-site/add-site.component";
import { SiteService } from "../services/site.service";
import { WorkflowComponent } from "./workflow/workflow.component";

@NgModule({
    imports:[CommonModule, IonicModule, AddSiteComponent, WorkflowComponent],
    exports:[AddSiteComponent, WorkflowComponent],
    providers:[SiteService]

})
export class ComponentsModule{}