import axios from "axios";
import { PatientWithoutSSN, Patient, PatientFormValues, PatientEntryFormValues, Entry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
    const { data } = await axios.get<PatientWithoutSSN[]>(
        `${apiBaseUrl}/patients`
    );

    return data;
};

const getPatientById = async (id: string) => {
    try {
        const { data } = await axios.get<PatientWithoutSSN>(
            `${apiBaseUrl}/patients/${id}`
        );

        return data;
    } catch (error) {
        console.error(error);
    }
};

const create = async (object: PatientFormValues) => {
    const { data } = await axios.post<Patient>(
        `${apiBaseUrl}/patients`,
        object
    );

    return data;
};

const createEntry = async (id: string, object: PatientEntryFormValues) => {
    const { data } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        object
    );

    return data;
};

export default {
    getAll,
    getPatientById,
    create,
    createEntry
};

