module.exports.create = (req, res) => {

    req.app.get('acl').allow(req.body.roleName, req.body.resources, req.body.actions, (error) => {

        if (!error) {

            res.status(200).json({
                roleName: req.body.roleName,
                resources: req.body.resources,
                actions: req.body.actions
            });
        } else {

            res.status(400).json(error);
        }
    });

}

module.exports.getPermissions = (req, res) => {


    req.app.get('acl').whatResources(req.body.roleName, (error, permissions) => {

        if (!error) {

            res.status(200).json({
                roleName: req.body.roleName,
                permissions
            });
        } else {

            res.status(400).json(error);
        }
    });
}

module.exports.addPermissions = (req, res) => {

    req.app.get('acl').allow(req.body.roleName, req.body.resources, req.body.actions, (error) => {

        if (!error) {

            res.status(200).json({
                roleName: req.body.roleName,
                resources: req.body.resources,
                actions: req.body.actions
            });
        } else {

            res.status(400).json(error);
        }
    });

}

module.exports.removePermissions = (req, res) => {

    req.app.get('acl').removeAllow(req.body.roleName, req.body.resources, req.body.actions, (error) => {

        if (!error) {

            res.status(200).json({
                roleName: req.body.roleName,
                resources: req.body.resources,
                actions: req.body.actions
            });
        } else {

            res.status(400).json(error);
        }
    });

}
