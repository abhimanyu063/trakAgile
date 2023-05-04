import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.scss'],
  standalone:true,
  imports:[IonicModule]
})
export class DialogComponent  implements OnInit {
  @ViewChild('confirmModal') confirmModal:IonModal

  constructor() { }

  ngOnInit() {}
  public async onOpenModal()
  {
    this.confirmModal.isOpen=true;
    const { data } = await this.confirmModal.onDidDismiss();
    if(data==undefined)
    {
      this.confirmModal.isOpen=false;
    }
  }
}
