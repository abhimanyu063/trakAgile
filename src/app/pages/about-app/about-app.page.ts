import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-about-app',
  templateUrl: './about-app.page.html',
  styleUrls: ['./about-app.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [SharedService],
})
export class AboutAppPage implements OnInit {

  constructor(private sharedService: SharedService, private router: Router, private route: ActivatedRoute) {
    route.params.subscribe(val => {
      if (this.sharedService.getUserId() == "") {
        this.router.navigate(['/customer-login']);
      }
    });
  }

  ngOnInit() { }
}
