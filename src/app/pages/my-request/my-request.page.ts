import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-my-request',
  templateUrl: './my-request.page.html',
  styleUrls: ['./my-request.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MyRequestPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
