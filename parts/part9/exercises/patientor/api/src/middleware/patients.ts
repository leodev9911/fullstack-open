import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { NewEntryForPatientSchema, NewPatientEntrySchema } from '../schemas/patient';

export const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    NewPatientEntrySchema.parse(req.body);
    next();
};

export const newEntryForPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    NewEntryForPatientSchema.parse(req.body);
    next();
};

export const patientErrorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    } else { 
        next(error);
     }
};