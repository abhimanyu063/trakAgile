import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SharedService } from './services/shared.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule],
  providers:[]
})
export class AppComponent {
  public appPages = [
    { title: 'My Request', url: '/my-request', icon: 'mail' },
    { title: 'My Sites', url: '/my-sites', icon: 'paper-plane' },
    { title: 'Change Password', url: '/folder/favorites', icon: 'heart' },
    { title: 'About App', url: '/folder/archived', icon: 'archive' },
    { title: 'Logout', url: '/customer-login', icon: 'trash' }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {
  }

}
