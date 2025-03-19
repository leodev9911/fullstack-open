import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
import { useNavigate } from 'react-router'

export const LoginForm = ({ handleSetToken, handleErrorMessage }) => {
    const [user, setUser] = useState({
        username: '',
        password: ''
    })
    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            handleErrorMessage(error.graphQLErrors[0].message)
        }
    })
    const redirect = useNavigate()

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value

            handleSetToken(token)
            localStorage.setItem('user-token', token)
            redirect('/')
        }
    }, [result.data, handleSetToken, redirect])

    const handleChange = (event) => {
        const { name, value } = event.target

        setUser((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        login({ variables: { ...user } })
    }

    return <form
        onSubmit={handleSubmit}
    >
        <div>
            <label htmlFor="username">Username</label>
            <input
                type='text'
                id='username'
                name='username'
                value={user.username}
                onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input
                type='password'
                id='password'
                name='password'
                value={user.password}
                onChange={handleChange}
            />
        </div>
        <button>Login</button>
    </form>
}