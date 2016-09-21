import { Component } from '@angular/core';
import {LoggingService} from './services/logging.service';
import {CandidateCenterComponent} from './candidates/index';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    template: `<candidate-center></candidate-center>`
})
export class AppComponent {
    constructor(private logService: LoggingService) {
        this.logService.info('AppComponent.ctor(): loaded Angular 2.0.0 app.module...');
    }

}

