import {CandidateType} from './CandidateType';

export interface ICandidate {
    id?: string;
    name: string;
    position: CandidateType;
    email: string;
    phone: string; 
}