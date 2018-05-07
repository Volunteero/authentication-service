const acl = (require('../../../utils/get-acl-instance'))();
module.exports.access = async (req, res) => {

	let userId = 'guest';
	if (!req.user.guest) {

		userId = req.user.username;
	}
	acl.isAllowed(userId, req.query.resource, req.query.action, (error, allowed) => {

		if (allowed) {

			res.status(200).json({
				allowed: true,
			});
		} else {

			res.status(401).json({
				allowed: false,
			});
		}
	});


};