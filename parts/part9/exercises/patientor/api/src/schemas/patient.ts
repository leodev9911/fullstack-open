import { z } from 'zod';
import { Gender } from '../types/patient';

export const NewPatientEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
});

export const DiagnosisCodesSchemas = z.array(z.string()).optional();

export const NewBaseEntryForPatientSchema = z.object({
    date: z.string().date(),
    specialist: z.string(),
    description: z.string(),
    diagnosisCodes: DiagnosisCodesSchemas
});

export const NewHealthCheckEntryForPatientSchema = NewBaseEntryForPatientSchema.extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: z.number().int().min(0).max(3)
});

export const NewHospitalEntryForPatientSchema = NewBaseEntryForPatientSchema.extend({
    type: z.literal("Hospital"),
    discharge: z.object({
        date: z.string(),
        criteria: z.string()
    })
});

export const NewOccupationalHealthcareEntryForPatientSchema = NewBaseEntryForPatientSchema.extend({
    type: z.literal("OccupationalHealthcare"),
    employerName: z.string(),
    sickLeave: z.object({
        startDate: z.string(),
        endDate: z.string()
    }).optional()
});

export const NewEntryForPatientSchema = z.discriminatedUnion('type', [
    NewHealthCheckEntryForPatientSchema,
    NewHospitalEntryForPatientSchema,
    NewOccupationalHealthcareEntryForPatientSchema
]);

export const toNewPatientEntry = (object: unknown) => {
    return NewPatientEntrySchema.parse(object);
};

export const toNewEntryForPatientEntry = (object: unknown) => {
    return NewEntryForPatientSchema.parse(object);
};