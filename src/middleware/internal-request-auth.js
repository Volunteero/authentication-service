const ErrorResponse = require('../responses/error-response');
const aclConfig = require('../bootstrap/acl-init.config.json');
let accessKeys = {};
aclConfig.users.forEach(user => {

    // If they don't have a key set - ignore
    if (!user.accessKey || !user.secretAccessKey) return;
    // Otherwise make a dictionary for quickly checking the access keys
    accessKeys[user.accessKey] = {
        username: user.username,
        secretAccessKey: user.secretAccessKey,
        attachedRoles: user.attachedRoles
    }
});
module.exports = (req, res, next) => {

    // Get credentials from querystring
    let accessKey = req.query.accessKey || '';
    let secretAccessKey = req.query.secretAccessKey || '';

    // Check if there is such a key and if the secret is correct
    if (typeof accessKeys[accessKey] === 'undefined' || accessKeys[accessKey].secretAccessKey !== secretAccessKey) {

        throw new ErrorResponse(401, 'AccessDenied', 'No access key was found or the secret access key was invalid!');
    }

    // If it is just assign the user to the request
    req.user = accessKeys[accessKey];
    next();

}