import { NgModule} from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }   from './app.component';

import { CandidateListComponent} from './candidates/candidate-list.component';
import { CandidateCenterComponent  }   from './candidates/candidate-center.component';
//loaded from barrel for candidates
//import * as candidates from './candidates';


import { LoggingService } from './services/logging.service';
import { OfficeService } from './services/office.service';
import { CandidateService } from './services/candidate.service';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
        //routing,
    ],
    declarations: [
        AppComponent,
        CandidateListComponent,
        CandidateCenterComponent
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
        this.logService.info('AppModule.ctor(): loaded Angular 2.0.0 app.module...');
    }
}
