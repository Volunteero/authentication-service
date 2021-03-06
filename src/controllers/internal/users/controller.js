module.exports.create = (req, res) => {

    req.app.get('acl').addUserRoles(req.body.username, [], (error) => {

        if (!error) {

            res.status(201).json({
                username: req.body.username
            });
        } else {

            res.status(400).json(error);
        }
    });

}

module.exports.getRoles = (req, res) => {

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
}

module.exports.attachRoles = (req, res) => {

    req.app.get('acl').addUserRoles(req.body.username, req.body.roles, (error) => {

        if (!error) {

            res.status(200).json({
                username: req.body.username,
                newRoles: req.body.roles
            });
        } else {

            res.status(400).json(error);
        }
    });

}

module.exports.dettachRoles = (req, res) => {

    req.app.get('acl').removeUserRoles(req.body.username, req.body.roles, (error) => {

        if (!error) {

            res.status(200).json({
                username: req.body.username,
                detachedRoles: req.body.roles
            });
        } else {

            res.status(400).json(error);
        }
    });

}