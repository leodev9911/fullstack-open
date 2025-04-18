import {
    ChangeEvent
} from "react";

import {
    SelectChangeEvent,
    TextField,
} from '@mui/material';
import { HospitalEntryForm } from './add-patient-entry-form';

interface Props {
    hospitalEntry: HospitalEntryForm;
    handleHospitalChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => void;
}

export const HospitalEntryFormComponent: React.FC<Props> = ({
    hospitalEntry,
    handleHospitalChange
}) => {
    return (
        <>
            <TextField
                label="Discharge Criteria"
                name="criteria"
                fullWidth
                value={hospitalEntry.discharge.criteria}
                onChange={handleHospitalChange}
            />
            <TextField
                fullWidth
                type='date'
                label="Discharge date"
                name="date"
                value={hospitalEntry.discharge.date}
                onChange={handleHospitalChange}
            />
        </>
    );
};