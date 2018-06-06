
module.exports.access = async (req, res) => {

	let userId = 'guest';
	if (!req.user.guest) {

		userId = req.user.username;
	}
	req.app.get('acl').isAllowed(userId, req.query.resource, req.query.action, (error, allowed) => {

		if (allowed) {

			return res.status(200).json({
				allowed: true,
			});
		} else {

			return res.status(401).json({
				allowed: false,
			});
		}
	});


};