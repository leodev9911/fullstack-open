export const Alert = ({ errorMessage }) => {
    return (
        <h2 style={{ color: 'red' }}>
            {errorMessage}
        </h2>
    )
}