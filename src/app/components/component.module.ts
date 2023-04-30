import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { AddSiteComponent } from "./add-site/add-site.component";
import { SiteService } from "../services/site.service";
import { WorkflowComponent } from "./workflow/workflow.component";
import { SiteComponent } from "./site/site.component";

@NgModule({
    imports:[CommonModule, IonicModule, AddSiteComponent, WorkflowComponent, SiteComponent],
    exports:[AddSiteComponent, WorkflowComponent, SiteComponent],
    providers:[SiteService]

})
export class ComponentsModule{}