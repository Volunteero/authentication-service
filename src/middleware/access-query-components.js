module.exports = (req, res, next) => {

    let components = {};
    let componentNames = ['resource', 'actions'];
    // For every component get the value from the query string and make it an array
    componentNames.forEach(componentName => {

        components[componentName] = getComponent(req.query, componentName);
    });
    // We only support one resource with many actions
    components.resource = components.resource.join();
    req.accessQuery = components;
    next();
}

function getComponent(query = {}, componentName = '') {

    let queryComponent = query[componentName];
    if (typeof queryComponent !== 'undefined') {

        return queryComponent.split(',');
    }
    return [];
}