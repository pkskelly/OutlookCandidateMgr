import { Injectable } from '@angular/core';
import {LoggingService} from './logging.service';

@Injectable()
export class OfficeService {

    constructor(private logService: LoggingService) { }

    public getCandidatesFromEmail(): Promise<string[]>{
        let promise: Promise<string[]> = new Promise<string[]>((resolve, reject) => {
            try {
                let emailAddresses = new Array<string>();
                
                let currentEmail = Office.cast.item.toItemRead(Office.context.mailbox.item);
                this.logService.info('getCandidatesFromEmail(): Email Subject -', currentEmail.subject);
                //The following should be let entities: Office.Entities, but this gets a TS2339 error fot the forEach() below
                let entities: any = currentEmail.getEntitiesByType(Office.MailboxEnums.EntityType.EmailAddress);               
                if(entities instanceof Array){
                    this.logService.info('getEntitiesByType(): emails in an array', entities);
                    entities.forEach((x:string) => emailAddresses.push(x));
                    this.logService.info(' emails pushed into array', emailAddresses);
                }
                resolve(emailAddresses);        
            } catch (error){
                reject(error);
           } 
        });               
        return promise;
    }    
}