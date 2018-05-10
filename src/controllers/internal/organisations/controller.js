module.exports.create = (req, res) => {
    
    const {
        organisationId,
        username
    } = req.body;
    const organisation = `organisation:${organisationId}`;
    const roleName = `${organisation}:admin`;
    const allowedActions = [
        'addUser',
        'removeUser',
        'deleteOrganisation',
        'createEvent',
        'closeEvent',
        'verifyVolunteerParticipation',
        'setNumberOfEventPoints',
        'leaveUserReview',
        'editPage',
        'createCampaign',
        'verifySponsorContribution',
        'setNumberOfCampaignPoints',
        'sendContributionPromise',
        'assumeOrgansiationRole',
    ];
    
    // Create role
    req.app.get('acl').allow(roleName, [organisation], allowedActions, (error) => {

        if (!error) {

            // Attach to user
            req.app.get('acl').addUserRoles(username, [roleName], (error) => {

                if (!error) {

                    res.status(200).json({
                        roleName,
                        username,
                        allowedActions,
                        organisation,
                    });
                } else {

                    res.status(400).json(error);
                }
            });

        } else {

            res.status(400).json(error);
        }
    });

}