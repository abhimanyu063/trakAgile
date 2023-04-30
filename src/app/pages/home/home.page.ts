import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {
  isTripStarted: boolean=false;
  constructor() { }

  ngOnInit() {
  }
  async onTripStarted(){
    this.isTripStarted=true;
    const coordinates=await Geolocation.getCurrentPosition().then((position)=>{
      console.log(position);
    });
    
  }

}
