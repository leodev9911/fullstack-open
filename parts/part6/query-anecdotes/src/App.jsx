import AnecdoteForm from './components/AnecdoteForm'
import AnecdotesList from './components/AnecdotesList'
import Notification from './components/Notification'
import { useNotification } from './context/NotificationContext'

const App = () => {
    const notification = useNotification()

    return (
        <div>
            <h3>Anecdote app</h3>

            {notification && <Notification content={notification} />}
            <AnecdoteForm />
            <AnecdotesList />
        </div>
    )
}

export default App
