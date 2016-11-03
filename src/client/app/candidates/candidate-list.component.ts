import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { LoggingService } from '../services/logging.service';
import { OfficeService } from '../services/office.service';
import { CandidateService } from '../services/candidate.service';
import { ICandidate, CandidateType } from '../../../shared/models';

@Component({
    moduleId: module.id,
    selector: 'candidate-list',
    templateUrl: 'candidate-list.component.html',
    styleUrls: ['candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {

    private candidates: ICandidate[];
    private errorMessage: string;

    constructor(private logService: LoggingService,
        private officeService: OfficeService,
        private candidateService: CandidateService) {
        //nothing yet
    }

    public ngOnInit() {
        this.logService.info('ngOnInit(): CandidateListComponent');
        this.loadCandidates();
      }

    private loadCandidates() {
        this.logService.info('loadCandidates(): CandidateListComponent calling service...');

        this.candidateService.getCandidates()
           .subscribe(
              candidates => this.candidates = candidates,
              error => this.errorMessage = <any>error
            );

        this.candidates.forEach((x: ICandidate) => { this.logService.log(x.email) });

    }

}