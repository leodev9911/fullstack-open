import Authors from "./pages/Authors"
import Books from "./pages/Books"
import NewBook from "./pages/NewBook"
import { NavBar } from './components/NavBar'
import { Navigate, Route, Routes } from 'react-router'
import { useState, useEffect } from 'react'
import { Alert } from './components/Alert'
import { Login } from './pages/Login'
import { Recommendations } from './pages/Recommendations'
import { useLazyQuery, useSubscription } from '@apollo/client'
import { ME, BOOK_ADDED, ALL_BOOKS } from './queries'
import { Toaster, toast } from 'sonner'

const App = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [token, setToken] = useState(localStorage.getItem('user-token') || null)
    const [me, { loading, data }] = useLazyQuery(ME)

    useSubscription(BOOK_ADDED, {
        onData: ({ data, client }) => {
            const bookAdded = data.data.bookAdded
            toast.success(`${bookAdded.title} added`)

            client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
                return {
                    allBooks: allBooks.concat(bookAdded)
                }
            })
        }
    })

    useEffect(() => {
        if (token) {
            me()
        }
    }, [me, token])

    useEffect(() => {
        if (!loading && data && data.me) {
            localStorage.setItem('user', JSON.stringify(data.me))
        }
    }, [data, loading])

    const handleErrorMessage = (message) => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage('')
        }, 5000)
    }

    const handleSetToken = (value) => {
        setToken(value)
    }

    return (
        <>
            <Toaster />
            <NavBar
                token={token}
                handleSetToken={handleSetToken}
            />
            {errorMessage && <Alert errorMessage={errorMessage} />}
            <main>
                <Routes>
                    <Route
                        path='/'
                        element={<Authors />}
                    />
                    <Route
                        path='/login'
                        element={<Login
                            handleSetToken={handleSetToken}
                            handleErrorMessage={handleErrorMessage}
                        />}
                    />
                    <Route
                        path='/books'
                        element={<Books />}
                    />
                    <Route
                        path='/add-books'
                        element={
                            token
                                ? <NewBook handleErrorMessage={handleErrorMessage} />
                                : <Navigate to={'/'} />
                        }
                    />
                    <Route
                        path='/recommendations'
                        element={
                            token
                                ? <Recommendations />
                                : <Navigate to={'/'} />
                        }
                    />
                </Routes>
            </main>
        </>
    );
};

export default App;
