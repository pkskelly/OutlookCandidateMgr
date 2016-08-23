import { NgModule} from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
//import { FormsModule } from '@angular/forms';
//import { HttpModule, XHRBackend } from '@angular/http';
//import { routing } from './app.routing'; //TODO: Create app.routing


import { AppComponent }   from './app.component';
import { LoggingService } from './services/logging.service';
import { OfficeService } from './services/office.service';
import { CandidateService } from './services/candidate.service';


@NgModule({
    imports: [
        BrowserModule,
        //FormsModule,
        //HttpModule,
        //routing,
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        CandidateService,
        OfficeService,
        LoggingService
    ],
    bootstrap: [AppComponent],
})
export class AppModule { 
     constructor(private logService: LoggingService) { 
        this.logService.info('AppModule.ctor(): loaded RC-5 app.module...');
    }
}
