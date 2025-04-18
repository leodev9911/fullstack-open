export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export interface Patient {
    id: string;
    name: string;
    occupation: string;
    gender: Gender;
    ssn?: string;
    dateOfBirth?: string;
    entries: Entry[];
}


export interface BaseEntry {
    id: string;
    date: string;
    specialist: string;
    description: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRatingEnum {
    Healthy = 0,
    LowRisk = 1,
    HighRisk = 2,
    CriticalRisk = 3
}

export enum HealthCheckRatingColors {
    Healthy = 'green',
    LowRisk = 'yellow',
    HighRisk = 'orange',
    CriticalRisk = 'red'
}

export enum EntryTypeEnum {
    HealthCheck = 'HealthCheck',
    Hospital = 'Hospital',
    OccupationalHealthcare = 'OccupationalHealthcare'
}

export interface HealthCheckEntry extends BaseEntry {
    type: EntryTypeEnum.HealthCheck;
    healthCheckRating: HealthCheckRatingEnum;
}

export interface HospitalEntry extends BaseEntry {
    type: EntryTypeEnum.Hospital,
    discharge: {
        date: string;
        criteria: string;
    };
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: EntryTypeEnum.OccupationalHealthcare,
    employerName: string,
    sickLeave?: {
        startDate: string;
        endDate: string;
    }
}

export type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export type PatientEntryFormValues = UnionOmit<Entry, "id">;
export type PatientFormValues = Omit<Patient, "id" | "entries">;
export type PatientWithoutSSN = Omit<Patient, "ssn">;