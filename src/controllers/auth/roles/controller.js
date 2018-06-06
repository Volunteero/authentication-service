const Account = require('../../../models/account');
const bcrypt = require('bcrypt');
const ErrorResponse = require('../../../responses/error-response');

module.exports.getRoles = async (req, res) => {

	req.app.get('acl').userRoles(req.body.username, (error, roles) => {

        if (!error) {

            res.status(200).json({
                username: req.body.username,
                roles
            });
        } else {

            res.status(400).json(error);
        }
    });
};
