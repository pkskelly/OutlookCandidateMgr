import { Component, OnInit } from '@angular/core';

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

    public lookupCandidates: ICandidate[] = [];

    constructor(private logService: LoggingService,
        private officeService: OfficeService,
        private candidateService: CandidateService) {
        //nothing yet
    }

    public ngOnInit() {
        this.logService.info('ngOnInit: CandidateListComponent');

        //TODO: Lookup candidates from the current email
        this.loadMatchesFromEmail();
    }
    private loadMatchesFromEmail(): void {
        // use the OfficeService to get all words that start with a capital letter
        //  which are possible name candidates
        this.officeService.getCandidatesFromEmail()
            .then((candidates: string[]) => {
                // take candidate words from email & submit to MiniCRM to find matching
                //  customers
                this.candidateService.lookupCandidatePartials(candidates)
                    .then((results: ICandidate[]) => {
                        // take the matching customers to assign to the public property
                        //  on the component
                        this.lookupCandidates = results;
                    });
            });
    }

    private getCustomerInitials(candidate: ICandidate): string {
        return candidate.name.replace(/[a-z]/g, '').replace(' ', '');
    }

}