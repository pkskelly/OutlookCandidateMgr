import { Component } from '@angular/core';
import {LoggingService} from './services/logging.service';
import {CandidateCenterComponent} from './candidates/index';

@Component({
  moduleId: module.id,  
  selector: 'my-app',
  directives: [CandidateCenterComponent],
  providers: [LoggingService],
  template: `<candidate-center></candidate-center>`
})
export class AppComponent {
    constructor(){}
}
