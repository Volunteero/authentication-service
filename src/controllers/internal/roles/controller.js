const acl = (require('../../../utils/get-acl-instance'))();

module.exports.create = (req, res) => {

    acl.allow(req.body.roleName, req.body.resources, req.body.actions, (error) => {

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


    acl.whatResources(req.body.roleName, (error, permissions) => {

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

    acl.allow(req.body.roleName, req.body.resources, req.body.actions, (error) => {

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

    acl.removeAllow(req.body.roleName, req.body.resources, req.body.actions, (error) => {

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
