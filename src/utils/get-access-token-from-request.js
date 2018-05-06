module.exports = (req) => {
    if (req.signedCookies && req.signedCookies.accessToken) {
        return req.signedCookies.accessToken;
    }
    return null;
}