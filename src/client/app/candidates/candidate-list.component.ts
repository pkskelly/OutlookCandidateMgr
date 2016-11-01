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

    public lookupCandidates: ICandidate[] = [];
    public existingCandidate: boolean = false; 
    public currentCandidate: ICandidate = null;

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
        this.loadMatchesFromEmail();
   //     this.getHeroes();
   //     this.logService.log("From the heroes API  "  + this.candidates[0].email);
    }


    // getHeroes() {
    //       this.candidateService.getCandidates()
    //                .subscribe(
    //                   candidates => this.candidates.concat(candidates),
    //                   error => this.errorMessage = <any>error
    //                 );
    // }


    private loadMatchesFromEmail(): void {
        this.logService.info('CandidateListComponent:loadMatchesFromEmail() called...');
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
                        this.logService.info('CandidateListComponent:loadMatchesFromEmail() - matches found!');
                        this.lookupCandidates = results;
                        this.existingCandidate = true;                        
                    }).catch((reason: any) => {
                        this.logService.info('CandidateListComponent:loadMatchesFromEmail() - no matches found!');
                        this.lookupCandidates = [];
                    });
            });
        
        this.logService.info('CandidateListComponent: Matches :' + this.lookupCandidates.toString());

    }

    // private getCustomerInitials(candidate: ICandidate): string {
    //     this.logService.info('CandidateListComponent:getCustomerInitials() called...');

    //     //return candidate.name.replace(/[a-z]/g, '').replace(' ', '');
    //     return 'PAS';

    // }

}