require('dotenv').config();
const jwt = require('jsonwebtoken');

const privateKey = process.env.PRIVATE_KEY;

module.exports = (user, payload = {}) => {

    payload = Object.assign(payload, {
        username: user.username,
        id: user.id
    })
    // Password valid - set cookie with token
    return jwt.sign(payload,
        Buffer.from(privateKey, 'base64'), {
            algorithm: 'RS256',
            expiresIn: '6h'
        },
    );

}
