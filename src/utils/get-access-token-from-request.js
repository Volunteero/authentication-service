module.exports = (req) => {
    if (typeof req.query.accessToken !== 'undefined') {

        return req.query.accessToken;
    } else if (typeof req.body.accessToken !== 'undefined') {

        return req.body.accessToken;
    }
    return null;
}
