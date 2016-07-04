import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import {LoggingService} from './services/logging.service';

export class OutlookApp {
    constructor(private logService: LoggingService) {
        this.initOfficeAddin();
    }
    private initOfficeAddin(): void {
        this.logService.log('addin loaded - message using LoggingService instance');
        
        Office.initialize = (reason: Office.InitializationReason) => {
            bootstrap(AppComponent)
                .then(success => this.logService.log('addin loaded successfully', success))
                .catch(error => this.logService.error('Error loading addin', error));
        }
    }
}

let loggingService: LoggingService = new LoggingService();
loggingService.category = 'bootstrapping';
let outlookApp: OutlookApp = new OutlookApp(loggingService);
