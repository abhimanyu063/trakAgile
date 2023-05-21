import { ToastController, ToastOptions } from "@ionic/angular";
import { AppConfig } from "../appconfig";
import { Injectable } from "@angular/core";

@Injectable()
export class CustomToast {
    constructor(private toastController: ToastController) { }

    displayToast(message: string, position: ToastOptions['position'] = 'bottom') {
        this.toastController.create({
            //header: 'Welcome!',
            message: message,
            position: position,
            cssClass: 'custom-toast-success',
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