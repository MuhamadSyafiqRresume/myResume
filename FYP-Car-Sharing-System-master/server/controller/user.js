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

exports.login = function(req, res, next){
    // res.send('respond with resource');
    passport.authenticate('local',{
        session: true,
        }, function (err, user, info){
            if(!isEmpty(err)){
                res.send(err)
            }
            else if(isEmpty(user)){
                console.log('no user found')
                res.send(info)
            }else{
                console.log('go through here')
                req.logIn(user,function(err){
                    console.log(user)
                    console.log(req.user)
                    res.send(user)
                })
            }
    })(req, res, next)
}

exports.getUser = function (req, res, next) { 
    console.log(req.body.userObj._id)
    return models.users.findAll({
        where: {
            id:{
                [op.eq]: req.body.userObj._id
            }
    }, 
    }).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(500).send(err);
    })
}

exports.getGuest = function (req, res, next) { 
    console.log(req.body.userObj._id)
    return models.users.findAll({
        where: {
            isGuest:{
                [op.eq]: true
            }
    }, 
    }).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(500).send(err);
    })
}

exports.getHost = function (req, res, next) { 
    console.log(req.body.userObj._id)
    return models.users.findAll({
        where: {
            isHost:{
                [op.eq]: true
            }
    }, 
    }).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(500).send(err);
    })
}

//check if logged in
exports.check_logged = function (req, res, next) {
    // console.log(req.user)
    try {
        if (req.user){
            // console.log(req.user.id);
            res.status(200).send({
                id: req.user.id
            });
        }
        else {
            res.send({
                err: "noPermission"
            });
        }
    } catch (error) {
        res.send({
            error: "systemErr"
        })
    }
}

// //logout
// exports.logout = function (req, res, next) {
//     console.log(req.session);
//     try{
//         req.logOut();
//         req.session.destroy((err) => {
//             res.clearCookie('connect.sid');
//             // Don't redirect, just print text
//             console.log("Logging out")
//             delete req.session;
//             res.status(200).send({
//                     logout: "logout"
//                 });
//           });
//     } catch(err){
//         console.log(err);
//     }
// }

//logout
exports.logout = function (req, res, next) {
    req.logout();
    req.session.destroy();
    res.status(200).send({
        logout: "logout"
    });
}

exports.register = function(req, res, next){
    let errors = {};
    return validateUser(errors,req).then(errors => {
        if(!isEmpty(errors)){
            res.send(errors)
        } else{
            newUser = models.users.build({
                username: req.body.userObj._username,
                password: generatehash(req.body.userObj._password),
                fullName: req.body.userObj._fullName,
                ICNumber: req.body.userObj._ICNumber,
                licenceClass: req.body.userObj._licenceClass,
                expiryDate: req.body.userObj._expiryDate,
                fullAddress: req.body.userObj._fullAddress,
                isHost: req.body.userObj._isHost,
                isGuest: req.body.userObj._isGuest,
                isAdmin: req.body.userObj._isAdmin,
                email: req.body.userObj._email,
                isActive: false,
                isApproved: false

            });
            return newUser.save().then(result => {
                // setNewUser(result)
                res.status(200).send(result)
            }).catch(err => {
                console.log(err)
                res.status(500).send(err);
            })
        }
    })
}

exports.addManual = function(req, res, next){
    let errors = {};
    return validateUser(errors,req).then(errors => {
        if(!isEmpty(errors)){
            res.send(errors)
        } else{
            newUser = models.users.build({
                username: req.body.userObj._username,
                password: generatehash(req.body.userObj._password),
                fullName: req.body.userObj._fullName,
                ICNumber: req.body.userObj._ICNumber,
                licenceClass: req.body.userObj._licenceClass,
                expiryDate: req.body.userObj._expiryDate,
                fullAddress: req.body.userObj._fullAddress,
                isHost: req.body.userObj._isHost,
                isGuest: req.body.userObj._isGuest,
                isAdmin: req.body.userObj._isAdmin,
                email: req.body.userObj._email,
                isActive: true,
                isApproved: true

            });
            return newUser.save().then(result => {
                // setNewUser(result)
                res.status(200).send(result)
            }).catch(err => {
                console.log(err)
                res.status(500).send(err);
            })
        }
    })
}

exports.updateUser = function (req, res, next) {
    return updateUser = models.users.update({
        username: req.body.userObj._username,
        password: generatehash(req.body.userObj._password),
        fullName: req.body.userObj._fullName,
        ICNumber: req.body.userObj._ICNumber,
        licenceClass: req.body.userObj._licenceClass,
        expiryDate: req.body.userObj._expiryDate,
        fullAddress: req.body.userObj._fullAddress,
        isHost: req.body.userObj._isHost,
        isGuest: req.body.userObj._isGuest,
        isAdmin: req.body.userObj._isAdmin,
        email: req.body.userObj._email,
    },{
        where: {
          id: {
            [op.eq]: req.body.userObj._id
          }
        }
      }
    ).then(user => {
        res.status(200).send(user);
    }).catch(err => {
        res.status(500).send(err);
    })
}

exports.upgradeToHost = function (req, res, next) {
    return upgradeToHost = models.users.update({
        isHost: true,
        isGuest: false,
    },{
        where: {
          id: {
            [op.eq]: req.body.userObj._id
          }
        }
      }
    ).then(user => {
        res.status(200).send(user);
    }).catch(err => {
        res.status(500).send(err);
    })
}

exports.deleteUser = function (req, res, next) {
    return models.users.destroy({
        where: {
            id:{
                [op.eq]: req.body.userObj._id
            }
    }, 
    }).then(user => {
        res.status(200).sendStatus(user);
    }).catch(err => {
        res.status(500).sendStatus(err);
    })
}

exports.activateUser = function (req, res, next) {
    return updateUser = models.users.update({
        isActive: true,
    },{
        where: {
          id: {
            [op.eq]: req.body.userObj._id
          }
        }
      }
    ).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(500).send(err);
    })
}

exports.deactivateUser = function (req, res, next) {
    return updateUser = models.users.update({
        isActive: false,
    },{
        where: {
          id: {
            [op.eq]: req.body.userObj._id
          }
        }
      }
    ).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(500).send(err);
    })
}

exports.getPendingGuest = function (req, res, next) { 
    console.log(req.body.userObj._id)
    return models.users.findAll({
        where: {
            isGuest:{
                [op.eq]: true
            },
            isApproved:{
                [op.eq]: false
            }
    }, 
    }).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(500).send(err);
    })
}

exports.getPendingHost = function (req, res, next) { 
    console.log(req.body.userObj._id)
    return models.users.findAll({
        where: {
            isHost:{
                [op.eq]: true
            },
            isApproved:{
                [op.eq]: false
            }
    }, 
    }).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(500).send(err);
    })
}

exports.approveUser = function (req, res, next) {
    return updateUser = models.users.update({
        isActive: true,
        isApproved: true
    },{
        where: {
          id: {
            [op.eq]: req.body.userObj._id
          }
        }
      }
    ).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(500).send(err);
    })
}

exports.declineUser = function (req, res, next) {
    return models.users.destroy({
        where: {
            id: {
                [op.eq]: req.body.userObj._id
            }
    }, 
    })
    .then(function (deletedRecord) {
        if(deletedRecord === 1){
            res.status(200).json({message:"Deleted successfully"});          
        }
        else
        {
            res.status(404).json({message:"record not found"})
        }
    })
    .catch(function (error){
        res.status(500).json(error);
    });
}

const setNewUser = (data) => {
    const setExpenses = (data) => {
        return new Promise((resolve, reject) => {
            return models.expenses.create({
                user_id:data.id
            }).then(expUser =>{
                resolve(expUser)
            }).catch(err =>{
                reject(err)
            })
        })
    }
    Promise.all([setExpenses(data)])
        .then(result => {
            console.log("Successfully created")
        }).catch(err =>{
            console.log("Error!!!")
        })
}



