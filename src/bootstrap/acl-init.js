const aclConfig = require('./acl-init.config.json');

module.exports = (acl) => {

    // Add all roles from acl config
    aclConfig.roles.forEach(role => {

        acl.allow(role.name, role.resources, role.actions, () => {

            console.log(role.name, role.resources, role.actions);
        });
    });

    // Get all resources for admin role
    const allResources = aclConfig.resources.map(resource => resource.name);
    console.log(`All resources: ${allResources.join()}`);
    // Create admin role
    acl.allow('admin', allResources, '*');

    // Attach roles to configured users
    aclConfig.users.forEach(user => {

        acl.addUserRoles(user.username, user.attachedRoles, () => {

            console.log(user.username, user.attachedRoles);
        });
    });
}