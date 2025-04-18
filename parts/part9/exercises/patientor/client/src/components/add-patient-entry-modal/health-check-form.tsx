import {
    ChangeEvent
} from "react";

import {
    Box,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';

import {
    HealthCheckRatingEnum,
} from "../../types";
import { HealthCheckEntryForm } from './add-patient-entry-form';

interface Props {
    healtCheckEntry: HealthCheckEntryForm;
    handleCheckEntryChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => void;
}

export const HealthCheckEntryFormComponent: React.FC<Props> = ({
    healtCheckEntry,
    handleCheckEntryChange
}) => {
    const ratings = Object.values(HealthCheckRatingEnum)
        .filter(value => typeof value !== 'string');

    return (
        <>
            <Box>
                <InputLabel sx={{ marginBottom: '6px' }}>Health Check Rating</InputLabel>
                <Select
                    fullWidth
                    name="healthCheckRating"
                    //@ts-expect-error because i'm sure that this is fine
                    value={healtCheckEntry.healthCheckRating}
                    onChange={handleCheckEntryChange}
                >
                    {
                        ratings.map(value => <MenuItem
                            key={value}
                            value={value}
                        >
                            {value}
                        </MenuItem>)
                    }
                </Select>
            </Box>
        </>
    );
};