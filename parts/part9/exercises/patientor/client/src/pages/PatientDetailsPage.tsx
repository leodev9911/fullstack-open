import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Diagnosis, Entry, Gender, HealthCheckRatingEnum, HealthCheckRatingColors, Patient, PatientEntryFormValues } from '../types';
import patientsService from '../services/patients';
import {
    Female,
    Male,
    Transgender,
    LocalHospital,
    Work,
    MedicalServices,
    Favorite,
    SvgIconComponent
} from '@mui/icons-material';
import { AddPatientEntryModal } from '../components/add-patient-entry-modal';
import axios from 'axios';

interface Props {
    diagnoses: Diagnosis[];
}

export const PatientDetailsPage: React.FC<Props> = ({ diagnoses }) => {
    const [loading, setLoading] = useState(false);
    const [patient, setPatient] = useState<Patient | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const { id } = useParams();

    useEffect(() => {
        if (!patient && id) {
            setLoading(true);

            const fetchPatient = async () => {
                const response = await patientsService.getPatientById(id);

                if (response) setPatient(response);
                setLoading(false);
            };

            void fetchPatient();
        }
    }, [patient, id]);

    const getGenderIcon = (gender: Gender): React.ReactElement<SvgIconComponent> => {
        switch (gender) {
            case Gender.Male:
                return <Male />;
            case Gender.Female:
                return <Female />;
            case Gender.Other:
                return <Transgender />;
        }
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const getTypeIcon = (type: Entry['type']) => {
        switch (type) {
            case 'Hospital':
                return <LocalHospital />;
            case 'HealthCheck':
                return <MedicalServices />;
            case 'OccupationalHealthcare':
                return <Work />;
        }
    };

    const getDiagnoseName = (code: string): string | undefined => {
        return diagnoses.find(d => d.code === code)?.name;
    };

    const getRatingIconColor = (rating: HealthCheckRatingEnum) => {
        switch (rating) {
            case HealthCheckRatingEnum.Healthy:
                return HealthCheckRatingColors.Healthy;
            case HealthCheckRatingEnum.LowRisk:
                return HealthCheckRatingColors.LowRisk;
            case HealthCheckRatingEnum.HighRisk:
                return HealthCheckRatingColors.HighRisk;
            case HealthCheckRatingEnum.CriticalRisk:
                return HealthCheckRatingColors.CriticalRisk;
        }
    };

    const submitNewPatientEntry = async (values: PatientEntryFormValues) => {
        if (patient) {
            try {
                const entry = await patientsService.createEntry(patient.id, values);

                const patientWithNewEntry: Patient = {
                    ...patient,
                    entries: patient?.entries.concat(entry)
                };

                setPatient(patientWithNewEntry);

                setModalOpen(false);
            } catch (e: unknown) {
                if (axios.isAxiosError(e)) {
                    if (e?.response?.data && typeof e?.response?.data === "string") {
                        const message = e.response.data.replace('Something went wrong. Error: ', '');
                        console.error(message);
                        setError(message);
                    } else {
                        setError("Unrecognized axios error");
                    }
                } else {
                    console.error("Unknown error", e);
                    setError("Unknown error");
                }
            }
        }
    };

    return <div className="App">
        {
            !loading && patient
                ? <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        marginTop: '20px'
                    }}
                >
                    <Typography variant="h4">
                        {patient.name}
                        {getGenderIcon(patient.gender)}
                    </Typography>
                    <Box>
                        <Typography variant='body1'>
                            ssn: {patient.ssn}
                        </Typography>
                        <Typography variant='body1'>
                            occupation: {patient.occupation}
                        </Typography>
                    </Box>
                    {patient.entries.length > 0 && <Box>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '20px',
                                alignItems: 'center',
                                marginBottom: '20px'
                            }}
                        >
                            <Typography variant='body1' fontWeight="bold">
                                Entries
                            </Typography>

                            <Button variant="contained" onClick={() => openModal()}>
                                Add New Patient
                            </Button>
                        </Box>
                        {
                            patient?.entries?.map(entry =>
                                <Box key={entry.id}>
                                    <Typography variant='body1'>
                                        {entry.date}
                                        {getTypeIcon(entry.type)}
                                        {entry.type === 'OccupationalHealthcare' && entry.employerName}
                                    </Typography>
                                    <Typography variant='body1'>
                                        {entry.description}
                                    </Typography>
                                    {entry.type === 'HealthCheck' && <Favorite sx={{ color: getRatingIconColor(entry.healthCheckRating) }} />}
                                    <Typography variant='body1'>
                                        diganose by {entry.specialist}
                                    </Typography>
                                    <ul>
                                        {
                                            entry.diagnosisCodes?.map(code =>
                                                <li key={code}>
                                                    {code} {getDiagnoseName(code)}
                                                </li>
                                            )
                                        }
                                    </ul>
                                </Box>)
                        }
                    </Box>}
                    <AddPatientEntryModal
                        modalOpen={modalOpen}
                        onSubmit={submitNewPatientEntry}
                        error={error}
                        onClose={closeModal}
                        diagnoses={diagnoses}
                    />
                </Box>
                : <>...loading</>
        }
    </div>;
};