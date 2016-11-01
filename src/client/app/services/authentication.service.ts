import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoggingService } from '../services/logging.service';

@Injectable()
export class AuthenticationService {

    constructor(private http: Http, private logger: LoggingService) { 
        logger.log("AuthenticationService.ctor()...")
    }

}
