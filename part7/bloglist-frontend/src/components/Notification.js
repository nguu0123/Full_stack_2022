const Notification = ({ message, classname }) => {
    if (message === null) return null
    else
        return (
            <div className={classname}>
                {message}
            </div>
        )
}
export default Notification