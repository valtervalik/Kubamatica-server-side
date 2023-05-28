const {
	categorySchema,
	componentSchema,
	purchaseSchema,
	repairSchema,
	sellSchema,
	userSchema,
} = require('./utils/validation/schemas');

module.exports.validateCategory = (req, res, next) => {
	const { error } = categorySchema.validate(req.body);
	if (error) {
		console.log(error);
		res.json({ error: `${error.details[0].message}` });
	} else {
		next();
	}
};

module.exports.validateComponent = (req, res, next) => {
	const { error } = componentSchema.validate(req.body);
	if (error) {
		console.log(error);
		res.json({ error: `${error.details[0].message}` });
	} else {
		next();
	}
};

module.exports.validatePurchase = (req, res, next) => {
	const { error } = purchaseSchema.validate(req.body);
	if (error) {
		console.log(error);
		res.json({ error: `${error.details[0].message}` });
	} else {
		next();
	}
};

module.exports.validateRepair = (req, res, next) => {
	const { error } = repairSchema.validate(req.body);
	if (error) {
		console.log(error);
		res.json({ error: `${error.details[0].message}` });
	} else {
		next();
	}
};

module.exports.validateSell = (req, res, next) => {
	const { error } = sellSchema.validate(req.body);
	if (error) {
		console.log(error);
		res.json({ error: `${error.details[0].message}` });
	} else {
		next();
	}
};

module.exports.validateUser = (req, res, next) => {
	const { error } = userSchema.validate(req.body);
	if (error) {
		console.log(error);
		res.json({ error: `${error.details[0].message}` });
	} else {
		next();
	}
};
