const Notification = ({ message }) => {
    if (message.error === null && message.success === null) {
        return null
    }

    const type = message.error !== null ? "error" : "success"
    const msg = message.error !== null ? message.error : message.success

    return (
        <div className={type}>
            { msg }
        </div>
    )
}

export default Notification