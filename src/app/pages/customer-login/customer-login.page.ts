import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/user.service';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.page.html',
  styleUrls: ['./customer-login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CustomerLoginPage implements OnInit {
  mobile:string='';
  password:string=''

  constructor(private router: Router) { }

  ngOnInit() {
  }
  onNavigatetoRegistration(){
    this.router.navigate(['/customer-registration'])
  }
  async onLoginClick(){
    let request={
      mobile:this.mobile,
      password:this.password
    }
//    var response = await this.customerService.validateCustomer(request);
    this.router.navigate(['/home']);
  }

}
