import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared.service';
import { ApiHttpService } from 'src/app/services/ApiHttpService.services';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AppConfig } from 'src/app/appconfig';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [UserService, SharedService, ApiHttpService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChangePasswordPage implements OnInit {
  isAlertOpen: boolean = false;
  message: string = '';
  changePasswordForm: FormGroup;
  userId: Number = 0;
  public toastButtons = [
    {
      text: 'X',
      role: 'cancel',
    },
  ];

  constructor(private formBuilder: FormBuilder, private sharedService: SharedService, private userService: UserService, private router: Router, private toastController: ToastController, private route: ActivatedRoute) {
    route.params.subscribe(val => {
      if (this.sharedService.getUserId() == "") {
        this.router.navigate(['/customer-login']);
      }
      this.userId = Number(this.sharedService.getUserId());
      this.changePasswordForm = this.formBuilder.group({
        userId: this.userId,
        oldPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      });
    });
  }

  ngOnInit() { }

  async onChangePassword() {
    let payload = {
      userId: this.userId,
      oldPassword: this.changePasswordForm.value.oldPassword.trim(),
      newPassword: this.changePasswordForm.value.newPassword.trim()
    }
    if (payload.oldPassword !== "" && payload.newPassword !== "" && this.changePasswordForm.value.confirmPassword.trim() !== "") {
      if (payload.newPassword === this.changePasswordForm.value.confirmPassword.trim()) {
        const response = await this.userService.changePassword(payload);
        if (response.success) {
          this.isAlertOpen = true;
          this.message = "Password changed successfully.";
          this.router.navigate(['/customer-login']);
        }
        else {
          this.isAlertOpen = true;
          this.message = "Old password is incorrect.";
        }
      }
      else {
        this.isAlertOpen = true;
        this.message = "New password and Confirm password does not match.";
      }
    }
    else {
      this.message = "All fields are mandatory.";
    }
    this.displayToast();
  }
  displayToast() {
    this.toastController.create({
      //header: 'Welcome!',
      message: this.message,
      position: 'bottom',
      cssClass: 'toast-custom-class',
      buttons: [
        {
          side: 'end',
          text: 'Close',
          role: 'cancel',
          handler: () => { }
        }
      ]
    }).then((toast) => {
      toast.present();
    }).then(() => {
      setTimeout(() => this.toastController.dismiss(), AppConfig.toastDuration)
    });
  }
}
