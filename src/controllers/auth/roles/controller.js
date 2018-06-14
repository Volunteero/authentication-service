const Account = require('../../../models/account');
const bcrypt = require('bcrypt');
const ErrorResponse = require('../../../responses/error-response');

module.exports.getRoles = async (req, res) => {

    let oneFailed = false;
    req.app.get('acl').userRoles(req.user.username, (error, roles) => {

        if (error || oneFailed) {

            return res.status(400).json(error);

        }

        let enrichedRoles = [];
        let rolesToWait = roles.length;
        if (rolesToWait === 0) {

            return res.status(200).json({
                username: req.body.username,
                roles
            });
        }
        console.log(roles);

        roles.forEach(role => {

            req.app.get('acl').whatResources(role, (error, permissions) => {

                console.log(permissions);

                if (error || oneFailed) {

                    oneFailed = true;
                    return res.status(400).json(error);
                }
                enrichedRoles.push({
                    role,
                    permissions
                });
                if (rolesToWait === enrichedRoles.length) {

                    return res.status(200).json({
                        username: req.body.username,
                        roles: enrichedRoles
                    });
                }
            });
        });

    });
};