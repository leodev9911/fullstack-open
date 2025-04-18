import {
    Dialog,
    DialogTitle,
    DialogContent,
    Divider,
    Alert
} from '@mui/material';
import { Diagnosis, PatientEntryFormValues } from '../../types';
import { AddPatientEntryForm } from './add-patient-entry-form';

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: PatientEntryFormValues) => void;
    error?: string;
    diagnoses: Diagnosis[]
}

export const AddPatientEntryModal: React.FC<Props> = ({
    modalOpen,
    onClose,
    onSubmit,
    error,
    diagnoses
}) => (
    <Dialog
        fullWidth={true}
        open={modalOpen}
        onClose={() => onClose()}
    >
        <DialogTitle>Add a new patient entry</DialogTitle>
        <Divider />
        <DialogContent>
            {error && <Alert severity="error">{error}</Alert>}
            <AddPatientEntryForm
                onSubmit={onSubmit}
                onCancel={onClose}
                diagnoses={diagnoses}
            />
        </DialogContent>
    </Dialog>
);
