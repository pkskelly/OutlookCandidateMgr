import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import {LoggingService} from '../services/logging.service';
import {OfficeService} from '../services/office.service';
import {CandidateService} from '../services/candidate.service';
import {ICandidate, CandidateType} from '../../../shared/models';

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

        //TODO: Lookup candidates from the current email
        // this.loadMatchesFromEmail();
        this.getCandidates();

        this.candidates.forEach((x: ICandidate) => { this.logService.log(x.email)});        
    }


    getCandidates() {
          this.candidateService.getCandidates()
                   .subscribe(
                      candidates => this.candidates.concat(candidates),
                      error => this.errorMessage = <any>error
                    );
    }

}