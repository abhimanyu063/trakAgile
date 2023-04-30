import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { requestModel } from 'src/app/models/request.model';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
  imports:[IonicModule, CommonModule],
  standalone:true
})
export class RequestComponent  implements OnInit {
  @Input() request:requestModel
  constructor() { }

  ngOnInit() {}

}
