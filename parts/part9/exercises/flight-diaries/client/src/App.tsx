import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { DiaryEntry, NewDiaryEntry } from './services/diary/models/diary-entries'
import { getDiaryEntries } from './services/diary'
import { AddNewEntry } from './components/AddNewEntry'
import { DiaryEntries } from './components/DiaryEntries'
import { createNewEntry } from './services/diary'
import { Toaster } from 'sonner'

export const App = () => {
    const [diaries, setDiaries] = useState<DiaryEntry[] | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        getDiaryEntries().then(data => {
            setDiaries(data)
            setLoading(false)
        })
    }, [])

    const handleCreateNewEntry = async (newEntry: NewDiaryEntry) => {
        try {
            const response = await createNewEntry(newEntry)

            if (diaries && response) {
                setDiaries(diaries.concat(response))
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Toaster />
            <Header />
            <main>
                <AddNewEntry handleAddNewEntry={handleCreateNewEntry} />
                {
                    loading
                        ? <>...loading</>
                        : diaries
                            ? <DiaryEntries diaryEntries={diaries} />
                            : <>There are no entries to show</>
                }
            </main>
        </>
    )
}


