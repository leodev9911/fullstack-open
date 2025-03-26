import axios from 'axios'
import { DiaryEntry, NewDiaryEntry } from './models/diary-entries'
import { toast } from 'sonner'


const baseURL = 'http://localhost:3000'

export const getDiaryEntries = () => axios
    .get<DiaryEntry[]>(`${baseURL}/api/diaries`)
    .then(res => res.data)

export const createNewEntry = async (newEntry: NewDiaryEntry) => {
    try {
        const response = await axios.post<DiaryEntry>(`${baseURL}/api/diaries`, newEntry)
        
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error)
            toast.error(error.response?.statusText, {
                description: error.response?.data
            })
        } else {
            console.error(error)
        }
    }
}