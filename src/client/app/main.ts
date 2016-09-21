import {platformBrowserDynamic}    from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {AppModule} from './app.module';
import {LoggingService} from './services/logging.service';


export class OutlookApp {
    constructor(private logService: LoggingService) {
        this.initOfficeAddin();
    }
 
    private initOfficeAddin(): void {
        this.logService.log('CandidateManager Addin loading...');
        
        Office.initialize = (reason: Office.InitializationReason) => {
            this.logService.log('Office.initialize() called...');
            
            //enableProdMode();  //uncoment for release
            platformBrowserDynamic().bootstrapModule(AppModule)
                .then(success => this.logService.log('CandidateManager loaded successfully. Addin load reason :  ' + reason, success))
                .catch(error => this.logService.error('Error loading CandidateManager addin.', error));
        }
    }
}

let loggingService: LoggingService = new LoggingService();
loggingService.category = 'bootstrapping';
let outlookApp: OutlookApp = new OutlookApp(loggingService);
