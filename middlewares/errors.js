const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;

	if (process.env.NODE_ENV === 'development') {
		res.status(err.statusCode).json({
			success: false,
			error: err,
			errMessage: err.message,
			stack: err.stack
		});
	}

	if (process.env.NODE_ENV === 'production') {
		console.log('here ' + process.env.NODE_ENV);
		let error = { ...err };

		error.message = err.message;

		// Wrong mongoose object ID error
		if (err.name === 'CastError') {
			// const message = `Resource not found. Invalid. Invalid : ${err.path}`; // path should not be visible in prod
			const message = `Resource not found. Invalid`; // path should not be visible in prod
			error = new ErrorHandler(message, 404);
		}

		// Handling Mongoose validation error
		if (err.name === 'ValidationError') {
			const message = Object.values(err.errors).map(value => value.message);
			error = new ErrorHandler(message, 404);
		}

		// Handle mongoose duplicate key error
		if (err.code === 11000) {
			const message = `Duplicate ${Object.keys(err.keyValue)} entered.`;
			error = new ErrorHandler(message, 400);
		}

		// Handling wrong JWT token error
		if (err.name === 'JsonWebTokenError') {
			const message = 'JSON web token is invalid. Try Again !';
			error = new ErrorHandler(message, 500);
		}

		// Handling expired JWT token error
		if (err.name === 'TokenExpiredError') {
			const message = 'JSON web token is expired. Try Again !';
			error = new ErrorHandler(message, 500);
		}

		res.status(error.statusCode).json({
			success: false,
			message: error.message || 'Internal Server Error.',
		});
	}

}
