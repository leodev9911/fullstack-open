const NotificationSucces = ({ successMessage, errorMessage }) => {
    return <>
        {successMessage && <div className="success">{successMessage}</div>}
        {errorMessage && <div className="error">{errorMessage}</div>}
    </>;
};

export default NotificationSucces;
