const Notification = ({ content }) => {
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5,
    }

    return <div style={style}>{content}</div>
}

export default Notification
