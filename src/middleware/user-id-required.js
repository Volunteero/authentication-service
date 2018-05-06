require('dotenv').config();
const getToken = require('../utils/get-access-token-from-request');
const jwt = require('jsonwebtoken');
const secret = Buffer.from(process.env.PUBLIC_KEY, 'base64');
const guestUser = {
    guest: true
};

module.exports = (req, res, next) => {

    // Get the token from the request
    let accessToken = getToken(req);
    // Check if we have empty token
    if (accessToken === null) {

        req.user = guestUser;
        next();
    } else {

        // Or one that is not valid anymore
        jwt.verify(accessToken, secret, (error, payload) => {
            if (error) {

                // If there is an error assume guest user
                req.user = guestUser;
                next();
            }
            // else pass the user information
            req.user = {
                guest: false,
                ...payload
            };
            next();
        });
    }
}