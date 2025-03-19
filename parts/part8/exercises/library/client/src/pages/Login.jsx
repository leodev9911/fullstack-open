import { LoginForm } from '../components/LoginForm'

export const Login = ({ handleSetToken, handleErrorMessage }) => {
    return <>
        <h2>Login</h2>
        <LoginForm
            handleSetToken={handleSetToken}
            handleErrorMessage={handleErrorMessage}
        />
    </>
}