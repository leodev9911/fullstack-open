import { NonSensitiveDiaryEntry } from '../services/diary/models/diary-entries'

interface DiaryEntriesProps {
    diaryEntries: NonSensitiveDiaryEntry[];
}

export const DiaryEntries: React.FC<DiaryEntriesProps> = ({ diaryEntries }) => {
    return <>
        <h2>Diary Entries</h2>
        <div>
            {
                diaryEntries.map((entry) => <div key={entry.id}>
                    <h2>{entry.date}</h2>
                    <p>
                        <strong>Visibility: </strong>{entry.visibility}
                    </p>
                    <p>
                        <strong>Weather: </strong>{entry.weather}
                    </p>
                </div>)
            }
        </div>
    </>
}