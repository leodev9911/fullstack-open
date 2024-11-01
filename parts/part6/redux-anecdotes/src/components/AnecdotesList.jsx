import { useSelector, useDispatch } from 'react-redux'
import { initializeAnecdote, voteAnecdote } from '../store/reducers/anecdotesReducer'
import {
    setNotification
} from '../store/reducers/notificationsReducer'
import { useEffect } from 'react'

const AnecdotesList = () => {
    const anecdotes = useSelector((state) => state.anecdotes)
    const dispatch = useDispatch()
    const filter = useSelector((state) => state.filter)

    useEffect(() => {
        dispatch(initializeAnecdote())
    }, [dispatch])

    const anecdotesToRender = anecdotes
        .filter((a) => a.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => b.votes - a.votes)

    const handleVote = (anecdote) => {
        const newAnedocte = structuredClone(anecdote)
        newAnedocte.votes += 1
        dispatch(voteAnecdote(newAnedocte))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    }

    return (
        <>
            {anecdotesToRender.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button
                            onClick={() =>
                                handleVote(anecdote)
                            }
                        >
                            vote
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}

export default AnecdotesList
