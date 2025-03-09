import Authors from "./pages/Authors";
import Books from "./pages/Books";
import NewBook from "./pages/NewBook";
import { NavBar } from './components/NavBar';
import { Route, Routes } from 'react-router';
import { useState } from 'react';
import { Alert } from './components/Alert';

const App = () => {
    const [errorMessage, setErrorMessage] = useState('')

    const handleErrorMessage = (message) => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage('')
        }, 5000)
    }

    return (
        <>
            <NavBar />
            {errorMessage && <Alert errorMessage={errorMessage} />}
            <main>
                <Routes>
                    <Route
                        path='/'
                        element={<Authors />}
                    />
                    <Route
                        path='/books'
                        element={<Books />}
                    />
                    <Route
                        path='/add-books'
                        element={<NewBook handleErrorMessage={handleErrorMessage} />}
                    />
                </Routes>
            </main>
        </>
    );
};

export default App;
