import { Injectable } from '@angular/core';
@Injectable()
export class LoggingService {
    public category: string = '';
    private LOG_PREFIX: string = 'CandidateMgrNg2';

    constructor() { }

    public log(message: string, more?: any): void {
        if (more === undefined) {
            console.log('%s:%s | %s', this.LOG_PREFIX, this.category, message);
        } else {
            console.log('%s:%s | %s', this.LOG_PREFIX, this.category, message, more);
        }
    }

    public info(message: string, more?: any): void {
        if (more === undefined) {
            console.info('%s:%s | %s', this.LOG_PREFIX, this.category, message);
        } else {
            console.info('%s:%s | %s', this.LOG_PREFIX, this.category, message, more);
        }
    }
    public warn(message: string, more?: any): void {
        if (more === undefined) {
            console.warn('%s:%s | %s', this.LOG_PREFIX, this.category, message);
        } else {
            console.warn('%s:%s | %s', this.LOG_PREFIX, this.category, message, more);
        }
    }

    public error(message: string, more?: any): void {
        if (more === undefined) {
            console.error('%s:%s | %s', this.LOG_PREFIX, this.category, message);
        } else {
            console.error('%s:%s | %s', this.LOG_PREFIX, this.category, message, more);
        }
    }
}
