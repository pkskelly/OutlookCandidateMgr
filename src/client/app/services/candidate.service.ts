import { Injectable } from '@angular/core';
import {LoggingService} from '../services/logging.service';
import {ICandidate, CandidateType} from '../../../shared/models';

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
            "position": CandidateType.AssociateConsultant,
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
            "phone": "+1 (809) 559-3097",
            "email": "sbyers@acme.com",
            "position": CandidateType.Consultant,
            "name": "Shaffer Byers",
            "id": "f359a1f7-1fc6-4754-8555-8d71380c91c1"
        }
    ];

@Injectable()
export class CandidateService {

    constructor(private logService: LoggingService) { }

    public lookupCandidatePartials(possibleCandidates: string[]) {
        let promise: Promise<ICandidate[]> = new Promise<ICandidate[]>((resolve, reject) => {
            try {
                if (!possibleCandidates || possibleCandidates.length === 0) {
                    this.logService.warn('lookupCandidatePartials(): no candidates provided to lookup.');
                    resolve(new Array<ICandidate>());
                }

                let filter: string = possibleCandidates.join(',');

                let candidates = CANDIDATES;

                //TODO: repalce with query to http service
                resolve(candidates);
            } catch (error) {
                reject(error);
            }
        });
        return promise;

    }

}
