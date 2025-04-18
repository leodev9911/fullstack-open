import express, { Response } from 'express';
import { Diagnosis } from '../types/diagnosis';
import { getDiagnoses } from '../services/diagnoses';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
    res.status(200).send(getDiagnoses());
});

export default router;