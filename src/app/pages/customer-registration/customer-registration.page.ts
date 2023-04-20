import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.page.html',
  styleUrls: ['./customer-registration.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CustomerRegistrationPage implements OnInit {
  registrationForm:FormGroup;
  isSuccess:boolean=false;
  successResponse:any;
  isSubmitted:boolean=false;
  isRegisterClicked=false;

  constructor() { }

  ngOnInit() {
    // this.registrationForm=this.formBuilder.group({
    //   name:['', Validators.required],
    //   email:[''],
    //   mobile:['', Validators.required],
    //   password:['', Validators.required], 
    //   pinCode:[''],
    //   gender:[''],
    //   city:[''],
    //   address:['']
    // });
    
  }
  async onRegistration()
  {
    this.isSubmitted=true;
    this.isRegisterClicked=true;
    if(this.registrationForm.invalid)
    {
      this.isRegisterClicked=false;
      return;

    }
  }
}