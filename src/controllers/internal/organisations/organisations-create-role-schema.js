module.exports = {
	type: 'object',
	properties: {
		organisationId: {
			type: 'string',
			required: true,
		},
		username: {
			type: 'string',
			required: true,
		},
	},
	additionalProperties: false,
};