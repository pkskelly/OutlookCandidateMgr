import { Component, OnInit } from '@angular/core';

import {LoggingService} from '../services/logging.service';
import {CandidateListComponent } from './candidate-list.component';

@Component({
    moduleId: module.id,
    directives: [CandidateListComponent],
    selector: 'candidate-center',
    templateUrl: 'candidate-center.component.html',
    styleUrls: ['candidate-center.component.css']
})
export class CandidateCenterComponent implements OnInit {
    constructor(private logService: LoggingService) { }

    ngOnInit() { 
        this.logService.info('ngOnInit: CandidateCenterComponent');
    }

}