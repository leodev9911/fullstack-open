import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../store/login'
import Notification from './Notification'

export default function LoginForm({
    notification,
}) {
    const dispatch = useDispatch()
    const [logInForm, setLogInForm] = useState({
        username: '',
        password: '',
    })

    const handleChange = (event) => {
        const { value, name } = event.target

        setLogInForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        dispatch(login(logInForm))
        setLogInForm({
            username: '',
            password: '',
        })
    }

    return (
        <>
            <h1>log in to application</h1>
            {(notification.error || notification.success) && (
                <Notification
                    error={notification.error}
                    success={notification.success}
                />
            )}
            <form>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={logInForm.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={logInForm.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" onClick={handleSubmit}>login</button>
            </form>
        </>
    )
}
