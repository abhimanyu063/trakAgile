import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ApiHttpService } from 'src/app/services/ApiHttpService.services';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.page.html',
  styleUrls: ['./customer-login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  providers: [UserService, ApiHttpService, SharedService]
})
export class CustomerLoginPage implements OnInit {
  mobile: string = 'testing';
  password: string = 'testing'

  constructor(private router: Router, private userService: UserService, private sharedService: SharedService) { }

  ngOnInit() {
  }
  onNavigatetoRegistration() {
    this.router.navigate(['/customer-registration'])
  }
  async onLoginClick() {
    let request = {
      userName: this.mobile,
      password: this.password
    }
    console.log(request);
    var response = await this.userService.validateCustomer(request).toPromise();
    console.log(response);
    if (response.success) {
      this.sharedService.setUserId(response.data.userId);
      this.sharedService.setUserName(response.data.userName);
      this.sharedService.setName(response.data.name);
    }
    console.log(response);
    this.router.navigate(['/home']);
  }

}
