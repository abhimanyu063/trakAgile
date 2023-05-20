import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SharedService } from './services/shared.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule],
  providers: [SharedService]
})
export class AppComponent implements OnInit {
  name: string = '';
  email: string = '';

  public appPages = [
    { title: 'My Request', url: '/my-request', icon: 'mail' },
    { title: 'My Sites', url: '/my-sites', icon: 'paper-plane' },
    { title: 'Change Password', url: '/change-password', icon: 'key' },
    { title: 'About App', url: '/about-app', icon: 'archive' },
    { title: 'Logout', url: '/customer-login', icon: 'log-out' }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private sharedService: SharedService, private route: ActivatedRoute) {
    route.params.subscribe(val => {
      this.name = this.sharedService.getName();
      this.email = this.sharedService.getEmail();
    });
  }

  ngOnInit() { }
}
