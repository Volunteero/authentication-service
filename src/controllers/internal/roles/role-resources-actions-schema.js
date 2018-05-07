module.exports = {
	type: 'object',
	properties: {
		roleName: {
			type: 'string',
			required: true,
		},
		resources: {
			type: 'array',
			items: {
				type: 'string'
			},
			required: true,
		},
		actions: {
			type: 'array',
			items: {
				type: 'string'
			},
			required: true,
		}
	},
	additionalProperties: false,
};