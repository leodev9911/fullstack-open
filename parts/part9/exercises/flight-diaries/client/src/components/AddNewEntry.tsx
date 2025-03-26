import { useState } from 'react'
import { NewDiaryEntry, Visibility, Weather } from '../services/diary/models/diary-entries'

interface AddNewEntryProps { 
    handleAddNewEntry: (newEntry: NewDiaryEntry) => void
}

export const AddNewEntry: React.FC<AddNewEntryProps> = ({ handleAddNewEntry }) => {
    const [newEntry, setNewEntry] = useState<NewDiaryEntry>({
        date: '',
        visibility: Visibility.Ok,
        weather: Weather.Sunny,
        comment: ''
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target

        setNewEntry(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        handleAddNewEntry(newEntry)
        
        setNewEntry({
            date: '',
            visibility: Visibility.Ok,
            weather: Weather.Sunny,
            comment: ''
        })
    }

    return <>
        <h2>Add New Entry</h2>
        <form
            onSubmit={handleSubmit}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}
        >
            <div>
                <label htmlFor='date'>Date</label>
                <input
                    id='date'
                    name='date'
                    onChange={handleChange}
                    type='date'
                    value={newEntry.date}
                />
            </div>
            <div>
                <p>Visibility</p>
                <div style={{ display: 'flex' }}>
                    {
                        Object.entries(Visibility).map(([key, value], index) => <div key={index}>
                            <label htmlFor={value}>{key}</label>
                            <input
                                id={value}
                                name='visibility'
                                onChange={handleChange}
                                type='radio'
                                checked={newEntry.visibility === value ? true : false}
                                value={value}
                            />
                        </div>)
                    }
                </div>
            </div>
            <div>
                <p>Weather</p>
                <div style={{ display: 'flex' }}>
                    {
                        Object.entries(Weather).map(([key, value], index) => <div key={index}>
                            <label htmlFor={value}>{key}</label>
                            <input
                                id={value}
                                name='weather'
                                onChange={handleChange}
                                type='radio'
                                checked={newEntry.weather === value ? true : false}
                                value={value}
                            />
                        </div>)
                    }
                </div>
            </div>
            <div>
                <label htmlFor='comment'>Comment</label>
                <input
                    id='comment'
                    name='comment'
                    onChange={handleChange}
                    type='text'
                    value={newEntry.comment}
                />
            </div>
            <button style={{ width: 'fit-content' }}>Submit</button>
        </form>
    </>
}