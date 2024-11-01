import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services/anecdotes'
import { useDispatchNotification } from '../context/NotificationContext'

const AnecdoteForm = () => {
    const queryClient = useQueryClient()
    const dispatchNotification = useDispatchNotification()

    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onError: (error, variables, context) => {
            if (context?.previousAnecdotes) {
                queryClient.setQueryData(['anecdotes'], context.previousAnecdotes);
            }
            dispatchNotification({
                type: 'ERROR',
                payload: 'too short anecdote, must have 5 characters lenght or more',
            })
            setTimeout(() => dispatchNotification({ type: 'CLEAR' }), 5000)
        },
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(
                ['anecdotes'],
                anecdotes.concat(newAnecdote)
            )
        },
    })

    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value

        const newAnecdote = {
            content,
            votes: 0,
        }

        event.target.anecdote.value = ''
        dispatchNotification({ type: 'CREATE', payload: newAnecdote.content })
        setTimeout(() => dispatchNotification({ type: 'CLEAR' }), 5000)
        newAnecdoteMutation.mutate(newAnecdote)
    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
