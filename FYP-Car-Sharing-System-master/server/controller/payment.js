let models = require('../models');
let bcrypt = require('bcrypt');
const passport =  require('passport');
const myPassport = require('../passport_setup')(passport);
const {isEmpty} = require('lodash');
const {validateUser} = require('../validators/signup');
var sequelize = require('sequelize');
var op = sequelize.Op;

const generatehash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}
exports.addPayment = function(req, res, next){
    newPayment = models.payment.build({
        rentId: req.body.paymentObj._rentId,
        status: req.body.paymentObj._status,
        amount: req.body.paymentObj._amount,
        billId: req.body.paymentObj._billId,
    });
    return newPayment.save().then(result => {
        // setNewUser(result)
        console.log(newPayment)
        res.status(200).send(result)
    }).catch(err => {
        console.log(err)
        res.status(500).send(err);
    })
}

