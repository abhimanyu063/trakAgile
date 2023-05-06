import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared.service';
import { ApiHttpService } from 'src/app/services/ApiHttpService.services';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [UserService, SharedService, ApiHttpService]
})
export class ChangePasswordPage implements OnInit {
  isAlertOpen: boolean = false;
  message: string = '';
  changePasswordForm: FormGroup;
  userId: Number = 0;
  public alertButtons = ['OK'];

  constructor(private formBuilder: FormBuilder, private sharedService: SharedService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userId = Number(this.sharedService.getUserId());
    this.changePasswordForm = this.formBuilder.group({
      userId: this.userId,
      oldPassword: [''],
      newPassword: [''],
      confirmPassword: [''],
    });
  }
  async onChangePassword() {
    if (this.changePasswordForm.value.newPassword.trim() === this.changePasswordForm.value.confirmPassword.trim()) {
      let payload = {
        userId: this.userId,
        oldPassword: this.changePasswordForm.value.oldPassword,
        newPassword: this.changePasswordForm.value.newPassword
      }
      const response = await this.userService.changePassword(payload);
      console.log(response.success)
      if (response.success) {
        this.isAlertOpen = true;
        this.message = "Password changed successfully!!!";
      }
      else{
        this.isAlertOpen = true;
        this.message = "Old password is incorrect.";
      }
    }
    else {
      this.isAlertOpen = true;
      this.message = "New password and Confirm password does not match.";
    }
  }
}
