import { Injectable, OnInit, OnDestroy } from '@angular/core';
import * as http from '@angular/http';
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
    
import { LoggingService } from '../services/logging.service';
import { ICandidate, CandidateType } from '../../../shared/models';


@Injectable()
export class CandidateService implements OnInit, OnDestroy {

    private candidatesUrl: string = '/api/candidates';

    ngOnInit() {
        this.logService.log('ngOnInit calling API for candidates...');
        let candidates = this.getCandidates();
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

    public getCandidates(): Observable<ICandidate[]> {
        return this._http.get(this.candidatesUrl)
            .map(this.extractCandidates)
            .catch(this.handleError);
    }


    private extractCandidates(res: http.Response) {
        let body = res.json();
        this.logService.log("RESPONSE BODY:\n\t" + body);
        return body.data || {};
    }
    private handleError(error: http.Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof http.Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        this.logService.error(errMsg);
        return Observable.throw(errMsg);
    }

}
