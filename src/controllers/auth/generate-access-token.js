require('dotenv').config();
const jwt = require('jsonwebtoken');

const privateKey = process.env.PRIVATE_KEY;

module.exports = (user) => {

    // Password valid - set cookie with token
    return jwt.sign({
            username: user.username,
            id: user.id
        },
        Buffer.from(privateKey, 'base64'), {
            algorithm: 'RS256',
            expiresIn: '15min'
        },
    );

}