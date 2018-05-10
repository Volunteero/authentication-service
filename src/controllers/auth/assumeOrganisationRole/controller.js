require('dotenv').config();
const generateAccessToken = require('../generate-access-token');

module.exports.assume = async (req, res) => {	

	const { organisationId } = req.query;
	const organisationResource = `organisation:${organisationId}`;
	
	req.app.get('acl').isAllowed(req.user.username, organisationResource, 'assumeOrgansiationRole', (error, allowed) => {

        if (!allowed) {

            return res.status(401).json({
                code: 'AccessDenied',
                message: `User ${req.user.username} does not have permission to assumeOrgansiationRole on resource ${organisationResource}`
            });
		}
		
        const accessToken = generateAccessToken(req.user, {
        	organisationId,
        	organisationRole: true
        });

        // Send the response
        return res.status(200).json({
        	accessToken,
        	success: true
        });
    });
	
};
