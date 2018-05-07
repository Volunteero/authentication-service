const aclConfig = require('./acl-init.config.json');
const acl = (require('../utils/get-acl-instance'))();

module.exports = () => {

    // Add all roles from acl config
    aclConfig.roles.forEach(role => {

        console.log(role.name, role.resources, role.actions);
        acl.allow(role.name, role.resources, role.actions);
    });

    // Get all resources for admin role
    const allResources = aclConfig.resources.map(resource => resource.name);
    // Create admin role
    acl.allow('admin', allResources, '*');

    // Attach roles to configured users
    aclConfig.users.forEach(user => {

        console.log(user.username, user.attachedRoles);
        acl.addUserRoles(user.username, user.attachedRoles);
    });
}