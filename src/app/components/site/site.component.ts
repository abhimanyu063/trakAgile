import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { siteModel } from 'src/app/models/site.model';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss'],
  standalone:true,
  imports:[IonicModule, CommonModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SiteComponent  implements OnInit {
  @Input() siteModel:siteModel;

  constructor() { }

  ngOnInit() {}

}
