import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';

export class OutlookApp {
    constructor() {
        this.initOfficeAddin();
    }

    private initOfficeAddin(): void {
        Office.initialize = (reason: Office.InitializationReason) => {
            bootstrap(AppComponent)
                .then(success => console.log('addin loaded successfully', success))
                .catch(error => console.log('Error loading addin', error));
        }
    }
}

let outlookApp: OutlookApp = new OutlookApp();
