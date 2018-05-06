module.exports = {
	type: 'object',
	properties: {
		username: {
			type: 'string',
			required: true,
		},
		password: {
			type: 'string',
			required: true,
			minLength: 6,
			pattern:
				'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
		},
	},
	additionalProperties: false,
};
