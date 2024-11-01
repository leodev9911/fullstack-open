import { useDispatch } from 'react-redux'
import {
    setNotification,
} from '../store/reducers/notificationsReducer'
import { useState } from 'react'
import { createAnecdote } from '../store/reducers/anecdotesReducer'

const AnecdotesForm = () => {
    const dispatch = useDispatch()

    const [form, setForm] = useState({
        content: '',
    })

    const handleChange = (event) => {
        const { value, name } = event.target

        setForm({
            [name]: value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            dispatch(createAnecdote(form.content))
            dispatch(setNotification(`you created '${form.content}'`, 5))
            setForm({
                content: '',
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        name="content"
                        value={form.content}
                        onChange={handleChange}
                    />
                </div>
                <button>create</button>
            </form>
        </>
    )
}

export default AnecdotesForm
