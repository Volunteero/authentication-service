module.exports = {
	type: 'object',
	properties: {
		username: {
			type: 'string',
			required: true,
		},
		roles: {
			type: 'array',
			items: {
				type: 'string'
			},
			required: true,
		}
	},
	additionalProperties: false,
};