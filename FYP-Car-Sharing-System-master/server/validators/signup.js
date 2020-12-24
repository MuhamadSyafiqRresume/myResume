let models = require('../models');
let validator = require('validator')

const validateCreateUserFields = function(errors, req){
    if(!validator.isAscii(req.body.userObj._password)){
        errors["password"] = "Invalid characters";
    }
    if(!validator.isLength(req.body.userObj._password, {min: 6})){
        errors["password"] = "Password too short";
    }
}

exports.validateUser = function(errors, req) {
	return new Promise(function(resolve, reject) {
		validateCreateUserFields(errors, req);
		return models.users.findOne({
			where: {
				username: req.body.userObj._username
			}
		}).then(u => {
			if (u !== null) {
				errors["err"] = "usernameInUsed";
			}
			resolve(errors);
		}).catch(err => {
			res.send(err)
		})
	})
}