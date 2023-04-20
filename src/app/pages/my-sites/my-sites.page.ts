import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-my-sites',
  templateUrl: './my-sites.page.html',
  styleUrls: ['./my-sites.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MySitesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
