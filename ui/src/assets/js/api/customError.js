class CustomError extends Error {
    constructor(statusCode, message, info) {
        super(message);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }
        this.type = 'customError';
        this.statusCode = statusCode;
        this.info = info;
    }
};