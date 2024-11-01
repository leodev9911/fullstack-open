import AnecdotesFilter from './components/AnecdotesFilter'
import AnecdotesForm from './components/AnecdotesForm'
import AnecdotesList from './components/AnecdotesList'
import Notification from './components/Notification'


const App = () => {
    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification />
            <AnecdotesFilter />
            <AnecdotesList />
            <AnecdotesForm />
        </div>
    )
}

export default App
