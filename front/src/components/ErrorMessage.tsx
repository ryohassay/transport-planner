type ErrorMessageType= {
    message: string
}

const ErrorMessage = ({message}: ErrorMessageType) => {
    return (
        <div className="error-container">
            {message}
        </div>
    );
};

export default ErrorMessage;
