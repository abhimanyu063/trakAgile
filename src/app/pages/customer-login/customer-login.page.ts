import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.page.html',
  styleUrls: ['./customer-login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CustomerLoginPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  onNavigatetoRegistration(){
    this.router.navigate(['/customer-registration'])
  }
  onLoginClick(){
    this.router.navigate(['/home'])
  }

}
