function errorHandler(err, req, res, next) {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    const error = err.error || {};
    res.status(status).json({ message, error });
}

module.exports = errorHandler;