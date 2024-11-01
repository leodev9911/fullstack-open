import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchAnecdotes, voteAnecdote } from '../services/anecdotes'
import { useDispatchNotification } from '../context/NotificationContext'

const AnecdotesList = () => {
    const queryClient = useQueryClient()
    const dispatchNotification = useDispatchNotification()

    const voteAnecdoteMutation = useMutation({
        mutationFn: voteAnecdote,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes']) || []
            const anecdoteIndex = anecdotes.findIndex(
                (anecdote) => anecdote.id === newAnecdote.id
            )
            anecdotes[anecdoteIndex].votes = newAnecdote.votes
            queryClient.setQueryData(['anecdotes'], anecdotes)
        },
        onError: (error) => {
            console.log(error)
        },
    })

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: fetchAnecdotes,
        retry: false,
    })

    const handleVote = (anecdote) => {
        const newAnecdote = structuredClone(anecdote)
        newAnecdote.votes += 1

        voteAnecdoteMutation.mutate(newAnecdote)
    }

    const anecdotes = result.data || []
    
    return result.isLoading ? (
        <div>loading...</div>
    ) : (
        <div>
            {anecdotes.map((anecdote) => (
                <div key={anecdote?.id}>
                    <div>{anecdote?.content}</div>
                    <div>
                        has {anecdote?.votes}
                        <button onClick={() => handleVote(anecdote)}>
                            vote
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdotesList
