import { Injectable, OnInit, OnDestroy } from '@angular/core';
import * as http from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { LoggingService } from '../services/logging.service';
import { ICandidate, CandidateType } from '../../../shared/models';



const CANDIDATES: ICandidate[] = [
    {
        "phone": "+1 (980) 435-3838",
        "email": "hcash@acme.com",
        "position": CandidateType.SeniorConsultant,
        "name": "Haney Cash",
        "id": "4525abe8-7e82-48e6-bce3-2494713acc49"
    },
    {
        "phone": "+1 (883) 402-3768",
        "email": "lgardner@acme.com",
        "position": CandidateType.Consultant,
        "name": "Latasha Gardner",
        "id": "6419a189-f0e3-422d-8a22-b98082cdb530"
    },
    {
        "phone": "+1 (836) 413-2150",
        "email": "apowers@acme.com",
        "position": CandidateType.PrincipalConsultant,
        "name": "Aurelia Powers",
        "id": "6e1a8bfb-75a0-4bd1-8eb5-144e7c302e15"
    },
    {
        "phone": "+1 (928) 486-2607",
        "email": "mnichols@acme.com",
        "position": CandidateType.SeniorConsultant,
        "name": "Michael Nichols",
        "id": "94e9d388-3e37-4fae-b7c7-9b4af0d703d1"
    },
    {
        "phone": "+1 (907) 414-3588",
        "email": "bodom@acme.com",
        "position": CandidateType.AssociateConsultant,
        "name": "Burton Odom",
        "id": "f570938f-c505-475e-9fbd-a67c4cf55402"
    },
    {
        "phone": "+1 (555) 555-1212",
        "email": "jtull@acme.com",
        "position": CandidateType.PrincipalConsultant,
        "name": "Jethro Tull",
        "id": "f359a1f7-1fc6-4754-8555-8d71380c91c1"
    }
];

@Injectable()
export class CandidateService implements OnInit, OnDestroy {

    private candidatesUrl: string = '/api/candidates';

    ngOnInit() {
        this.logService.log('ngOnInit calling API for candidates...');
        //let candidates = this.getCandidates();
        this.logService.log('ngOnInit completed call to API for candidates...');
    }

    ngOnDestroy() {
        this.logService.log('ngOnDetroy calling from CandidateService...');

        //dispose of other services as needed
        //do not need to worry about Http since this is handled by Http for us

        this.logService.log('ngOnDestroy complete for CandidateService...');
    }

    constructor(private logService: LoggingService, private _http: http.Http) {
        this.logService.log(' CandidateService.ctor() start ...');

        this.logService.log(' CandidateService.ctor() end ...');

    }

    public lookupCandidatePartials(possibleCandidates: string[]) {

        let promise: Promise<ICandidate[]> = new Promise<ICandidate[]>((resolve, reject) => {
            try {
                if (!possibleCandidates || possibleCandidates.length === 0) {
                    this.logService.warn('lookupCandidatePartials(): no candidates provided to lookup.');
                    resolve(new Array<ICandidate>());
                }
                this.logService.log('lookupCandidatePartials(): ' + possibleCandidates);

                let filter: string = possibleCandidates.join(',');

                let candidates = CANDIDATES.filter((x) => x.email === possibleCandidates.toString());
                if (candidates) {
                    this.logService.log('lookupCandidatePartials() match found: ' + candidates[0].name);
                }
                //TODO: repalce with query to http service
                resolve(candidates);

            } catch (error) {
                reject(error);
            }
        });
        return promise;

    }

    // public getCandidates(): Observable<ICandidate[]> {
    //     return this._http.get(this.candidatesUrl)
    //         .map(this.extractCandidates)
    //         .catch(this.handleError);
    // }


    // private extractCandidates(res: http.Response) {
    //     let body = res.json();
    //     return body.data || {};
    // }
    // private handleError(error: http.Response | any) {
    //     // In a real world app, we might use a remote logging infrastructure
    //     let errMsg: string;
    //     if (error instanceof http.Response) {
    //         const body = error.json() || '';
    //         const err = body.error || JSON.stringify(body);
    //         errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    //     } else {
    //         errMsg = error.message ? error.message : error.toString();
    //     }
    //     this.logService.error(errMsg);
    //     return Observable.throw(errMsg);
    // }

}
