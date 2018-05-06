const acl = (require('../../../utils/get-acl-instance'))();
module.exports.access = async (req, res) => {

	const accessComponents = req.accessQuery;
	let userId = 'guest';
	if (!req.user.guest) {

		userId = req.user.username;
	}
	acl.isAllowed(userId, accessComponents.resource, accessComponents.actions, (error, allowed) => {

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