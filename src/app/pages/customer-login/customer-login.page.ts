import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ApiHttpService } from 'src/app/services/ApiHttpService.services';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from 'src/app/services/shared.service';
import { DialogComponent } from 'src/app/components/dialog-component/dialog-component.component';
import { ComponentsModule } from 'src/app/components/component.module';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.page.html',
  styleUrls: ['./customer-login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule, ComponentsModule],
  providers: [UserService, ApiHttpService, SharedService],
})
export class CustomerLoginPage implements OnInit {
  public loginForm: FormGroup;
  isSubmitted: boolean = false;
  isInvalidLogin: boolean = false;
  @ViewChild('confirmModal') confirmModal: DialogComponent;
  constructor(private router: Router, private userService: UserService, private sharedService: SharedService,
    private formBuilder: FormBuilder, private modalCtrl: ModalController) {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.sharedService.setUserId('');
    this.sharedService.setUserName('');
    this.sharedService.setName('');
  }
  onNavigatetoRegistration() {
    this.router.navigate(['/customer-registration'])
  }
  async onLoginClick() {
    this.isSubmitted = true;
    var response = await this.userService.validateCustomer(this.loginForm.value).toPromise();
    if (response.success) {
      this.sharedService.setUserId(response.data.userId);
      this.sharedService.setUserName(response.data.userName);
      this.sharedService.setName(response.data.name);
      this.router.navigate(['/home']);
    }
    else {
      this.confirmModal.onOpenModal();
    }
  }
  get errorControl() {
    return this.loginForm.controls;
  }
}
