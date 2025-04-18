import {
    ChangeEvent
} from "react";

import {
    Box,
    SelectChangeEvent,
    TextField,
} from '@mui/material';

import { OccupationalHealthcareEntryForm } from './add-patient-entry-form';

interface Props {
    occupationalHealthcareEntry: OccupationalHealthcareEntryForm;
    handleOccupationalHealthcareEntryChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => void;
}

export const OccupationalHealthCareEntryFormComponent: React.FC<Props> = ({
    occupationalHealthcareEntry,
    handleOccupationalHealthcareEntryChange
}) => {
    return (
        <>
            <TextField
                label="Employer Name"
                name="employerName"
                fullWidth
                value={occupationalHealthcareEntry.employerName}
                onChange={handleOccupationalHealthcareEntryChange}
            />
            <Box
                sx={{
                    display: 'flex',
                    gap: '20px'
                }}
            >
                <TextField
                    sx={{ width: '50%' }}
                    type='date'
                    label="Start Date"
                    name="startDate"
                    value={occupationalHealthcareEntry.sickLeave?.startDate}
                    onChange={handleOccupationalHealthcareEntryChange}
                />
                <TextField
                    sx={{ width: '50%' }}
                    type='date'
                    label="End Date"
                    name="endDate"
                    value={occupationalHealthcareEntry.sickLeave?.endDate}
                    onChange={handleOccupationalHealthcareEntryChange}
                />
            </Box>
        </>
    );
};