
// Error handling when we hit a url that is not exist
export const notFound = (req, res, next) => {
    const err = new Error( `Resource not found ${req.originalUrl}`)
    next(err)
}


// Custom error handling
export const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if(err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message: 'Resource not found'
    }

    res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}