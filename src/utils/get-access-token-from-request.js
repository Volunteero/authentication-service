module.exports = (req) => {
    if (req.query.accessToken !== 'undefined') {

        return req.query.accessToken;
    } else if (req.body.accessToken !== 'undefined') {

        return req.body.accessToken;
    }
    return null;
}