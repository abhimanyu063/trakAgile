import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  providers: [UserService, ApiHttpService, SharedService]
})
export class CustomerLoginPage implements OnInit {
  public loginForm:FormGroup;
  isSubmitted:boolean=false;
  constructor(private router: Router, private userService: UserService, private sharedService: SharedService, 
    private formBuilder:FormBuilder) { 
      this.loginForm=this.formBuilder.group({
        userName:['', Validators.required],
        password:['', Validators.required]
      });
    }
  ngOnInit() {
    
  }
  onNavigatetoRegistration() {
    this.router.navigate(['/customer-registration'])
  }
  async onLoginClick() {
    this.isSubmitted=true;
    var response = await this.userService.validateCustomer(this.loginForm.value).toPromise();
    if (response.success) {
      this.sharedService.setUserId(response.data.userId);
      this.sharedService.setUserName(response.data.userName);
      this.sharedService.setName(response.data.name);
      this.router.navigate(['/home']);
    }
  }
  get errorControl() {
    return this.loginForm.controls;
  }
}
