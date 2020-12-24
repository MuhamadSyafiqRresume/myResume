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

// exports.search = function(req, res, next){
//     // result = models.car.findOne({
//     //     where: {
//     //         availableFrom
//     //     }
//     // })
//     dateInserted = req.body.carObj._paramIn_1;
//     // const { count, rows } = models.car.findAndCountAll({
//     //     where: {
//     //         availableFrom:{
//     //             [op.lte]: dateInserted
//     //         },
//     //         availableTo:{
//     //             [op.gte]: dateInserted
//     //         }
//     //     },
//     //   });
//     //   console.log(count);
//     //   console.log(rows);

//     find = models.car.findAll({
//         where: {
//             availableFrom:{
//                 [op.lte]: dateInserted
//             },
//             availableTo:{
//                 [op.gte]: dateInserted
//             }
//         },
//       });

//       try{
//         res.status(200).send(find)
//       }
//       catch(err){
//           console.log(err)
//           res.status(500).send(err);
//       }

//     //   return find.save().then(result => {
//     //     // setNewUser(result)
//     //     console.log(find)
//     //     res.status(200).send(result)
//     // }).catch(err => {
//     //     res.status(500).send(err);
//     // })

//     // return rows.save().then(result => {
//     //     // setNewUser(result)
//     //     console.log(rows)
//     //     res.status(200).send(rows)
//     // }).catch(err => {
//     //     res.status(500).send(err);
//     // })
// }

exports.search = function (req, res, next) {
    dateInserted = req.body.carObj._paramIn_1;
    console.log("Return date",req.body.carObj._paramIn_2)
    console.log("dateInserted",req.body.carObj._paramIn_1)
    return models.car.findAll({
        where: {
            availableFrom:{
                [op.lte]: dateInserted
            },
            availableTo:{
                [op.gte]: dateInserted
            },
            isActive:{
                [op.eq]: true
            },
            availableTo:{
                [op.gt]: req.body.carObj._paramIn_2
            },
    }, 
    }).then(car => {
        res.status(200).send(car);
    }).catch(err => {
        res.status(500).send(err);
    })
}



exports.addCar = function(req, res, next){
    newCar = models.car.build({
        registrationNumber: req.body.carObj._registrationNumber,
        ownerId: req.body.carObj._ownerId,
        locationLatitude: req.body.carObj._locationLatitude,
        locationLongitude: req.body.carObj._locationLongitude,
        carImage: req.body.carObj._carImage,
        carModel: req.body.carObj._carModel,
        isActive: false,
        ratePerDay: req.body.carObj._ratePerDay,
        city: req.body.carObj._city,
    });
    return newCar.save().then(result => {
        // setNewUser(result)
        console.log(newCar)
        res.status(200).send(result)
    }).catch(err => {
        res.status(500).send(err);
    })
}

exports.addCar1 = function(req, res, next){
    newCar = models.car.build({
        registrationNumber: req.body.carObj._registrationNumber,
        ownerId: req.body.carObj._ownerId,
        locationLatitude: req.body.carObj._locationLatitude,
        locationLongitude: req.body.carObj._locationLongitude,
        carImage: req.body.carObj._carImage,
        carModel: req.body.carObj._carModel,
        gpsId: req.body.carObj._gpsId,
        isActive: req.body.carObj._isActive,
        ratePerDay: req.body.carObj._ratePerDay,
        availableFrom: req.body.carObj._availableFrom,
        availableTo: req.body.carObj._availableTo,
        isapproved: false,
    });
    return newCar.save().then(result => {
        // setNewUser(result)
        console.log(newCar)
        res.status(200).send(result)
    }).catch(err => {
        res.status(500).send(err);
    })
}

exports.updateCar = function (req, res, next) {
    // dateInserted = req.body.carObj._paramIn_1;
    return updateCar = models.car.update({
        registrationNumber: req.body.carObj._registrationNumber,
        ownerId: req.body.carObj._ownerId,
        locationLatitude: req.body.carObj._locationLatitude,
        locationLongitude: req.body.carObj._locationLongitude,
        carImage: req.body.carObj._carImage,
        carModel: req.body.carObj._carModel,
        gpsId: req.body.carObj._gpsId,
        isActive: req.body.carObj._isActive,
        ratePerDay: req.body.carObj._ratePerDay,
        availableFrom: req.body.carObj._availableFrom,
        availableTo: req.body.carObj._availableTo,

    },{
        where: {
          id: {
            [op.eq]: req.body.carObj._id
          }
        }
      }
    ).then(car => {
        res.status(200).send(car);
    }).catch(err => {
        res.status(500).send(err);
    })
}

exports.activateCar = function (req, res, next) {
    // dateInserted = req.body.carObj._paramIn_1;
    return updateCar = models.car.update({
        isActive: true,
        availableFrom: req.body.carObj._availableFrom,
        availableTo: req.body.carObj._availableTo,
    },{
        where: {
          id: {
            [op.eq]: req.body.carObj._id
          }
        }
      }
    ).then(car => {
        res.status(200).send(car);
    }).catch(err => {
        res.status(500).send(err);
    })
}

exports.deactivateCar = function (req, res, next) {
    // dateInserted = req.body.carObj._paramIn_1;
    return updateCar = models.car.update({
        isActive: false,
        availableFrom: null,
        availableTo: null,
    },{
        where: {
          id: {
            [op.eq]: req.body.carObj._id
          }
        }
      }
    ).then(car => {
        res.status(200).send(car);
    }).catch(err => {
        res.status(500).send(err);
    })
}

exports.approveCar = function (req, res, next) {
    return approveCar = models.car.update({
        isapproved : true,
        authorizedbyid: req.body.carObj._paramIn_1
    },{
        where: {
          id: {
            [op.eq]: req.body.carObj._id
          }
        }
      }
    ).then(car => {
        res.status(200).send(car);
    }).catch(err => {
        res.status(500).send(err);
    })
}

exports.myCar = function (req, res, next) { 
    console.log(req.body.carObj._ownerId)
    return models.car.findAll({
        where: {
            ownerId:{
                [op.eq]: req.body.carObj._ownerId
            }
    }, 
    }).then(car => {
        res.status(200).send(car);
    }).catch(err => {
        res.status(500).send(err);
    })
}

exports.getCarOwner = function (req, res, next) { 
    console.log(req.body.carObj._ownerId)
    return models.car.findAll({
        where: {
            // ownerId:{
            //     [op.eq]: req.body.carObj._ownerId,
            // }
            id:{
                [op.eq]: req.body.carObj._id,
            }
        },          
        include: [{ 
            model: models.users,
            required:true
        }],
    }).then(car => {
        res.status(200).send(car);
    }).catch(err => {
        res.status(500).send(err);
    })
}
exports.allMyCar = function (req, res, next) { 
    console.log(req.body.carObj._ownerId)
    return models.car.findAll({
        where: {
            ownerId:{
                [op.eq]: req.body.carObj._ownerId
            }
    }, 
    }).then(car => {
        res.status(200).send(car);
    }).catch(err => {
        res.status(500).send(err);
    })
}
exports.myCarActive = function (req, res, next) { 
    console.log(req.body.carObj._ownerId)
    return models.car.findAll({
        where: {
            ownerId:{
                [op.eq]: req.body.carObj._ownerId
            },
            isActive:{
                [op.eq]: true
            },
            isapproved:{
                [op.eq]: true
            }
    }, 
    }).then(car => {
        res.status(200).send(car);
    }).catch(err => {
        res.status(500).send(err);
    })
}

exports.myCarInactive = function (req, res, next) { 
    console.log(req.body.carObj._ownerId)
    return models.car.findAll({
        where: {
            ownerId:{
                [op.eq]: req.body.carObj._ownerId
            },
            isActive:{
                [op.eq]: false
            },
            isapproved:{
                [op.eq]: true
            }
    }, 
    }).then(car => {
        res.status(200).send(car);
    }).catch(err => {
        res.status(500).send(err);
    })
}

exports.declineCar = function (req, res, next) {
    return declineCar = models.car.update({
        isapproved : false,
        authorizedbyid: req.body.carObj._paramIn_1
    },{
        where: {
          id: {
            [op.eq]: req.body.carObj._id
          }
        }
      }
    ).then(car => {
        res.status(200).send(car);
    }).catch(err => {
        res.status(500).send(err);
    })
}

exports.suspendCar = function (req, res, next) {
    return declineCar = models.car.update({
        isapproved : false,
        isActive : false,
        availableFrom: null,
        availableTo: null,
        authorizedbyid: req.body.carObj._paramIn_1
    },{
        where: {
          id: {
            [op.eq]: req.body.carObj._id
          }
        }
      }
    ).then(car => {
        res.status(200).send(car);
    }).catch(err => {
        res.status(500).send(err);
    })
}
exports.deleteCar = function (req, res, next) {
    return models.car.destroy({
        where: {
            id:{
                [op.eq]: req.body.carObj._id
            }
    }, 
    }).then(car => {
        res.status(200).sendStatus(car);
    }).catch(err => {
        res.status(500).sendStatus(err);
    })
}

exports.getPendingCar = function (req, res, next) { 
    console.log(req.body.carObj._ownerId)
    return models.car.findAll({
        include: [{ 
          model: models.users,
          required:true
      }],  
        where: {
            isapproved:{
                [op.eq]: null
            }
    }, 
    }).then(car => {
        res.status(200).send(car);
    }).catch(err => {
        res.status(500).send(err);
    })
}

exports.allCar = function (req, res, next) { 
    console.log(req.body.carObj._ownerId)
    return models.car.findAll({
        include: [{ 
          model: models.users,
          required:true
      }], 
        where: {
            isapproved:{
                [op.eq]: true
            }
    }, 
    }).then(car => {
        res.status(200).send(car);
    }).catch(err => {
        res.status(500).send(err);
    })
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
