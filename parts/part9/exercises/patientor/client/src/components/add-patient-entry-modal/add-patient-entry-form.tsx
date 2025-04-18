import {
    useState,
    SyntheticEvent,
    ChangeEvent
} from "react";

import {
    TextField,
    InputLabel,
    MenuItem,
    Select,
    Grid,
    Button,
    SelectChangeEvent,
    Typography,
    Box
} from '@mui/material';

import {
    Diagnosis,
    EntryTypeEnum,
    HealthCheckRatingEnum,
    PatientEntryFormValues,
} from "../../types";
import { HealthCheckEntryFormComponent } from './health-check-form';
import { HospitalEntryFormComponent } from './hospital-entry-form';
import { OccupationalHealthCareEntryFormComponent } from './occupational-healthcare-form';

interface Props {
    onCancel: () => void;
    onSubmit: (values: PatientEntryFormValues) => void;
    diagnoses: Diagnosis[];
}

export interface BaseEntryForm {
    date: string;
    specialist: string;
    description: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HealthCheckEntryForm {
    healthCheckRating: HealthCheckRatingEnum;
    type: EntryTypeEnum.HealthCheck,
}

export interface HospitalEntryForm {
    type: EntryTypeEnum.Hospital,
    discharge: {
        date: string;
        criteria: string;
    };
}

export interface OccupationalHealthcareEntryForm {
    type: EntryTypeEnum.OccupationalHealthcare,
    employerName: string,
    sickLeave: {
        startDate: string;
        endDate: string;
    }
}

export const AddPatientEntryForm: React.FC<Props> = ({
    onCancel,
    onSubmit,
    diagnoses
}) => {
    const getCurrentDate = (): string => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [entryType, setEntryType] = useState<EntryTypeEnum>(EntryTypeEnum.HealthCheck);

    const [baseEntry, setBaseEntry] = useState<BaseEntryForm>({
        date: getCurrentDate(),
        specialist: '',
        description: '',
        diagnosisCodes: [],
    });

    const [newHealthCheckEntry, setNewHealthCheckEntry] = useState<HealthCheckEntryForm>({
        healthCheckRating: HealthCheckRatingEnum.LowRisk,
        type: EntryTypeEnum.HealthCheck,
    });

    const [newHospitalEntry, setNewHospitalEntry] = useState<HospitalEntryForm>({
        type: EntryTypeEnum.Hospital,
        discharge: {
            date: getCurrentDate(),
            criteria: ''
        }
    });

    const [newOccupationatHealthcareEntry, setNewOccupationatHealthcareEntry] = useState<OccupationalHealthcareEntryForm>({
        type: EntryTypeEnum.OccupationalHealthcare,
        sickLeave: {
            startDate: '',
            endDate: ''
        },
        employerName: ''
    });

    const addPatientEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        let entry: PatientEntryFormValues;

        switch (entryType) {
            case EntryTypeEnum.HealthCheck:
                entry = {
                    ...baseEntry,
                    ...newHealthCheckEntry
                };
                break;
            case EntryTypeEnum.Hospital:
                entry = {
                    ...baseEntry,
                    ...newHospitalEntry
                };
                break;
            case EntryTypeEnum.OccupationalHealthcare:
                entry = {
                    ...baseEntry,
                    ...newOccupationatHealthcareEntry
                };
                break;
        }

        console.log(entry);
        onSubmit(entry);
    };

    const handleBaseEntryChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const { name, value } = event.target;

        if (name === "type") {
            setEntryType(value as EntryTypeEnum);
        } else {
            setBaseEntry((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleHealthCheckEntryChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const { name, value } = event.target;

        setNewHealthCheckEntry((prev) => ({
            ...prev,
            [name]: Number(value)
        }));
    };

    const handleHospitalChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const { name, value } = event.target;

        setNewHospitalEntry((prev) => ({
            ...prev,
            discharge: {
                ...prev.discharge,
                [name]: value
            }
        }));
    };

    const handleOccupationatHealthcareChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const { name, value } = event.target;

        if (name === "employerName") {
            setNewOccupationatHealthcareEntry((prev) => ({
                ...prev,
                [name]: value
            }));
        } else {
            setNewOccupationatHealthcareEntry((prev) => ({
                ...prev,
                sickLeave: {
                    ...prev.sickLeave,
                    [name]: value
                }
            }));
        }
    };

    return (
        <div>
            <Typography
                variant='h4'
            >
                New {entryType} entry
            </Typography>
            <form
                onSubmit={addPatientEntry}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        marginBottom: '20px',
                        maxHeight: '541px',
                        overflowY: 'auto'
                    }}
                >
                    <Box>
                        <InputLabel sx={{ marginBottom: '6px' }}>Entry type</InputLabel>
                        <Select
                            fullWidth
                            name="type"
                            value={entryType}
                            onChange={handleBaseEntryChange}
                        >
                            {
                                Object.values(EntryTypeEnum).map(value =>
                                    <MenuItem
                                        key={value}
                                        value={value}
                                    >
                                        {value}
                                    </MenuItem>
                                )
                            }
                        </Select>
                    </Box>
                    <TextField
                        label="Description"
                        name="description"
                        fullWidth
                        value={baseEntry.description}
                        onChange={handleBaseEntryChange}
                    />
                    <TextField
                        label="Date"
                        name='date'
                        placeholder="YYYY-MM-DD"
                        fullWidth
                        type='date'
                        value={baseEntry.date}
                        onChange={handleBaseEntryChange}
                    />
                    <TextField
                        label="Specialist"
                        name='specialist'
                        fullWidth
                        value={baseEntry.specialist}
                        onChange={handleBaseEntryChange}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            marginBottom: '20px',
                            maxHeight: '541px',
                            overflowY: 'auto'
                        }}
                    >
                        <InputLabel sx={{ marginBottom: '6px' }}>Diagnosis Codes</InputLabel>
                        <Select
                            multiple
                            fullWidth
                            name='diagnosisCodes'
                            //@ts-expect-error because i'm sure that this is fine
                            value={baseEntry.diagnosisCodes}
                            onChange={handleBaseEntryChange}
                        >
                            {
                                diagnoses.map(diagnose =>
                                    <MenuItem
                                        key={diagnose.code}
                                        value={diagnose.code}
                                    >
                                        {diagnose.code}
                                    </MenuItem>
                                )
                            }
                        </Select>
                    </Box>

                    {
                        entryType === EntryTypeEnum.HealthCheck &&
                        <HealthCheckEntryFormComponent
                            healtCheckEntry={newHealthCheckEntry}
                            handleCheckEntryChange={handleHealthCheckEntryChange}
                        />
                    }

                    {
                        entryType === EntryTypeEnum.Hospital &&
                        <HospitalEntryFormComponent
                            hospitalEntry={newHospitalEntry}
                            handleHospitalChange={handleHospitalChange}
                        />
                    }

                    {
                        entryType === EntryTypeEnum.OccupationalHealthcare &&
                        <OccupationalHealthCareEntryFormComponent
                            occupationalHealthcareEntry={newOccupationatHealthcareEntry}
                            handleOccupationalHealthcareEntryChange={handleOccupationatHealthcareChange}
                        />
                    }
                </Box>

                <Grid>
                    <Grid item>
                        <Button
                            color="secondary"
                            variant="contained"
                            style={{ float: "left" }}
                            type="button"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            style={{
                                float: "right",
                            }}
                            type="submit"
                            variant="contained"
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};