module.exports = class ErrorResponse extends Error {
	constructor(status, errorCode, message) {
		super(message);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);

		this.status = status;
		this.errorCode = errorCode;
	}
};