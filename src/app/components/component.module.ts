import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { AddSiteComponent } from "./add-site/add-site.component";
import { SiteService } from "../services/site.service";
import { WorkflowComponent } from "./workflow/workflow.component";
import { SiteComponent } from "./site/site.component";
import { DialogComponent } from "./dialog-component/dialog-component.component";

@NgModule({
    imports:[CommonModule, IonicModule, AddSiteComponent, WorkflowComponent, SiteComponent, DialogComponent],
    exports:[AddSiteComponent, WorkflowComponent, SiteComponent, DialogComponent],
    providers:[SiteService],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class ComponentsModule{}