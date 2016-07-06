import { Injectable } from '@angular/core';

import {LoggingService} from './logging.service';

@Injectable()
export class OfficeService {

    constructor(private logService: LoggingService) { }

    public getCandidatesFromEmail(): Promise<string[]>{
        let promise: Promise<string[]> = new Promise<string[]>((resolve, reject) => {
            try {
                let currentEmail = Office.cast.item.toItemRead(Office.context.mailbox.item);
                this.logService.info('getCandidatesFromEmail(): currentEmail', currentEmail);
                
                let candidates: string[] = currentEmail.getRegExMatchesByName('PossibleName');
                this.logService.info('getCandidatesFromEmail(): candidates in email', candidates);

                resolve(candidates);
            } catch (error){
                reject(error);
           } 
        });
                
        return promise;
    }    
}