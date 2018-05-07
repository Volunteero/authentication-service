module.exports = (req, res, next) => {

    const [_, resource, action] = req.path.split('/');
    req.accessQuery = {
        resource,
        action
    };
    next();
}

function getComponent(request, componentName = '') {

    let queryComponent = request.query[componentName];
    if (typeof queryComponent !== 'undefined') {

        return queryComponent.split(',');
    }
    return [];
}