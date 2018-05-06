const acl = (require('../../../utils/get-acl-instance'))();
module.exports.test = async (req, res) => {

    res.status(200).json({
        allowed: true,
    });

};