import express, { Request, Response } from 'express';
import { NewEntryForPatient, NewPatientEntry, Patient, PatientWithoutSSN } from '../types/patient';
import { addPatient, getPatientsWithoutSsn, getPatientById, addEntryForPatient } from '../services/patients';
import { newEntryForPatientParser, newPatientParser, patientErrorMiddleware } from '../middleware/patients';

const router = express.Router();

router.get('/', (_req, res: Response<PatientWithoutSSN[]>) => {
    res.status(200).send(getPatientsWithoutSsn());
});

router.get('/:id', (req: Request, res: Response<Patient | { error: string }>) => {
    const { id } = req.params;

    const patient = getPatientById(id);

    if (patient) {
        res.status(200).send(patient);
    } else {
        res.status(404).send({ error: 'Patient Not Found' });
    }
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<NewPatientEntry>) => {
    const addedPatient = addPatient(req.body);

    res.json(addedPatient);
});

router.post(
    '/:id/entries',
    newEntryForPatientParser,
    (req: Request<{ id: string }, unknown, NewEntryForPatient>, res: Response<NewEntryForPatient>) => {
        const { id } = req.params;
        const addedEntryForPatient = addEntryForPatient(id, req.body);

        res.json(addedEntryForPatient);
    }
);


router.use(patientErrorMiddleware);

export default router; 