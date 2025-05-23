import { NewEntryForPatientSchema, NewPatientEntrySchema } from '../schemas/patient';
import { z } from 'zod';
import { Diagnosis } from './diagnosis';

export interface BaseEntry {
    id: string;
    date: string;
    specialist: string;
    description: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
    Healthy = 0,
    LowRisk = 1,
    HighRisk = 2,
    CriticalRisk = 3
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
    type: 'Hospital',
    discharge: {
        date: string;
        criteria: string;
    };
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare',
    employerName: string,
    sickLeave?: {
        startDate: string;
        endDate: string;
    }
}

export type Entry = 
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
};

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type NewPatientEntry = z.infer<typeof NewPatientEntrySchema>;
export type NewEntryForPatient = z.infer<typeof NewEntryForPatientSchema>;

export type PatientWithoutSSN = Omit<Patient, 'ssn'>;