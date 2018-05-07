const ErrorResponse = require('../responses/error-response');
const acl = (require('../utils/get-acl-instance'))();

module.exports = async (req, res, next) => {

    // The username and access query are in the request after the 2 middlewares
    acl.isAllowed(req.user.username, req.accessQuery.resource, req.accessQuery.action, (error, allowed) => {

        if (!allowed) {

            return res.status(401).json({
                code: 'AccessDenied',
                message: `User ${req.user.username} does not have permission to ${req.accessQuery.action} on resource ${req.accessQuery.resource}`
            });
        }
        next();
    });

}