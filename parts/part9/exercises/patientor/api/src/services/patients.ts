import patientsData from '../data/patients';
import { Entry, NewEntryForPatient, NewPatientEntry, Patient, PatientWithoutSSN } from '../types/patient';
import { v1 as uuid } from 'uuid';

export const getPatientsWithoutSsn = (): PatientWithoutSSN[] => {
    return patientsData.map(({ id, name, dateOfBirth, occupation, gender, entries }) => ({
        id,
        gender,
        name,
        dateOfBirth,
        occupation,
        entries
    }));
};

export const getPatientById = (id: string): Patient | undefined => {
    return patientsData.find(patient => patient.id === id);
};

export const addPatient = (entry: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id: uuid(),
        ...entry,
        entries: []
    };

    patientsData.push(newPatientEntry);
    return newPatientEntry;
}
;
export const addEntryForPatient = (id: string, entry: NewEntryForPatient): Entry => {
    const newEntryForPatient = {
        id: uuid(),
        ...entry
    }; 
    const patientIndex = patientsData.findIndex(patient => patient.id === id);

    patientsData[patientIndex].entries.push(newEntryForPatient);
    
    return newEntryForPatient;
};