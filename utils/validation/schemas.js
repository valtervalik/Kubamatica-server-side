const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
	type: 'string',
	base: joi.string(),
	messages: {
		'string.escapeHTML': 'Ningún campo debe incluir HTML!',
	},
	rules: {
		escapeHTML: {
			validate(value, helpers) {
				const clean = sanitizeHtml(value, {
					allowedTags: [],
					allowedAttributes: {},
				});
				if (clean !== value) {
					return helpers.error('string.escapeHTML', { value });
				}
				return clean;
			},
		},
	},
});

const joi = BaseJoi.extend(extension);

module.exports.categorySchema = joi
	.object({
		category: joi.string().required().escapeHTML(),
	})
	.required();

module.exports.componentSchema = joi
	.object({
		brand: joi.string().required().escapeHTML(),
		model: joi.string().required().escapeHTML(),
		serial: joi.string().required().escapeHTML(),
		properties: joi.string().required().escapeHTML(),
		category: joi.string().required().escapeHTML(),
		status: joi.string().required().escapeHTML(),
		box: joi.number().required().min(0),
		price: joi.number().required().min(0),
		currency: joi.string().required().escapeHTML(),
	})
	.required();

module.exports.purchaseSchema = joi
	.object({
		supplier: joi.string().required().escapeHTML(),
		phone: joi.string().required().escapeHTML(),
		category: joi.string().required().escapeHTML(),
		status: joi.string().required().escapeHTML(),
		warranty: joi.number().required().min(0),
		box: joi.number().required().min(0),
		brand: joi.string().required().escapeHTML(),
		model: joi.string().required().escapeHTML(),
		serial: joi.string().required().escapeHTML(),
		properties: joi.string().required().escapeHTML(),
		date: {
			year: joi.number().required(),
			month: joi.number().required().min(0).max(11),
			day: joi.number().required().min(1).max(31),
			dayOfWeek: joi.string().required().escapeHTML(),
		},
		price: joi.number().required().min(0),
		currency: joi.string().required().escapeHTML(),
	})
	.required();

module.exports.repairSchema = joi.object({
	client: joi.string().required().escapeHTML(),
	phone: joi.string().required().escapeHTML(),
	technic: joi.string().required().escapeHTML(),
	warranty: joi.number().required().min(0),
	device: joi.string().required().escapeHTML(),
	description: joi.string().required().escapeHTML(),
	box: joi.number().required().min(0),
	date: {
		year: joi.number().required(),
		month: joi.number().required().min(0).max(11),
		day: joi.number().required().min(1).max(31),
		dayOfWeek: joi.string().required().escapeHTML(),
	},
	price: joi.number().required().min(0),
	currency: joi.string().required().escapeHTML(),
});

module.exports.sellSchema = joi.object({
	client: joi.string().required().escapeHTML(),
	phone: joi.string().required().escapeHTML(),
	technic: joi.string().required().escapeHTML(),
	category: joi.string().required().escapeHTML(),
	warranty: joi.number().required().min(0),
	box: joi.number().required().min(0),
	brand: joi.string().required().escapeHTML(),
	model: joi.string().required().escapeHTML(),
	serial: joi.string().required().escapeHTML(),
	status: joi.string().required().escapeHTML(),
	properties: joi.string().required().escapeHTML(),
	date: {
		year: joi.number().required(),
		month: joi.number().required().min(0).max(11),
		day: joi.number().required().min(1).max(31),
		dayOfWeek: joi.string().required().escapeHTML(),
	},
	price: joi.number().required().min(0),
	currency: joi.string().required().escapeHTML(),
});

module.exports.userSchema = joi.object({
	fullname: joi.string().required().escapeHTML(),
	username: joi.string().required().escapeHTML(),
	phone: joi.string().required().escapeHTML(),
	role: joi.string().required().escapeHTML(),
	email: joi.string().required().escapeHTML(),
	password: joi.string().required().escapeHTML(),
});
