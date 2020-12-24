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
exports.rentCar = function(req, res, next){
    rentCar = models.rent.build({
        carId: req.body.rentObj._carId,
        price: req.body.rentObj._price,
        isPaid: req.body.rentObj._isPaid,
        userId: req.body.rentObj._guestId,
        dateFrom: req.body.rentObj._dateFrom,
        dateTo: req.body.rentObj._dateTo,
        status: "Pending",
    });
    models.car.update({
        isActive: false,
    },{
        where: {
          id: {
            [op.eq]: req.body.rentObj._carId
          }
        }
      }
    )
    return rentCar.save().then(result => {
        // setNewUser(result)
        console.log(rentCar)
        res.status(200).send(result)
    }).catch(err => {
        res.status(500).send(err);
    })
}

exports.requestCar = function(req, res, next){
  rentCar = models.rent.build({
      carId: req.body.rentObj._carId,
      price: req.body.rentObj._price,
      isPaid: false,
      guestId: req.body.rentObj._guestId,
      hostId: req.body.rentObj._hostId,
      dateFrom: req.body.rentObj._dateFrom,
      dateTo: req.body.rentObj._dateTo,
      status: "Pending",
  });
  return rentCar.save().then(result => {
      // setNewUser(result)
      console.log(rentCar)
      res.status(200).send(result)
  }).catch(err => {
      res.status(500).send(err);
  })
}

exports.approveRental = function (req, res, next) {
  // console.log(req.body.rentObj._id)
  console.log("Rent ID",req.body.rentObj.id)
    return approveRental = models.rent.update({
        status : "Approved",
        authorizedBy: req.body.rentObj._paramIn_1
    },{
        where: {
          id: {
            [op.eq]: req.body.rentObj.id
          }
        }
      }
    ).then(car => {
        res.status(200).send(car);
    }).catch(err => {
        res.status(500).send(err);
    })
}

exports.declineRental = function (req, res, next) {
    return declinedRental = models.rent.update({
        status : "Declined",
        authorizedBy: req.body.rentObj._paramIn_1
    },{
        where: {
          id: {
            [op.eq]: req.body.rentObj.id
          }
        }
      }
    ).then(car => {
        res.status(200).send(car);
    }).catch(err => {
        res.status(500).send(err);
    })
}
exports.pay = function (req, res, next) {
  return declinedRental = models.rent.update({
      isPaid : true
  },{
      where: {
        id: {
          [op.eq]: req.body.rentObj.id
        }
      }
    }
  ).then(car => {
      res.status(200).send(car);
  }).catch(err => {
      res.status(500).send(err);
  })
}
exports.complete = function (req, res, next) {
  return declinedRental = models.rent.update({
      status : "Completed"
  },{
      where: {
        id: {
          [op.eq]: req.body.rentObj.id
        }
      }
    }
  ).then(car => {
      res.status(200).send(car);
  }).catch(err => {
      res.status(500).send(err);
  })
}
exports.rate = function (req, res, next) {
  console.log(req.body.rentObj._rate)
  return declinedRental = models.rent.update({
      rate : req.body.rentObj._rate
  },{
      where: {
        id: {
          [op.eq]: req.body.rentObj.id
        }
      }
    }
  ).then(car => {
      res.status(200).send(car);
  }).catch(err => {
      res.status(500).send(err);
  })
}

exports.myRentalCar = function (req, res, next) { 
  return models.rent.findAll({       
      include: [{ 
          model: models.car,
          required:true
      }],
      where: {
          carId:{
              [op.eq]: req.body.rentObj._carId
          }
      },  
  }).then(rent => {
      res.status(200).send(rent);
  }).catch(err => {
      res.status(500).send(err);
  })
}

exports.pendingReservation = function (req, res, next) { 
  return models.rent.findAll({   
    include: [{ 
      model: models.car,
      required:true
  }],  
      where: {
          guestId:{
              [op.eq]: req.body.rentObj._guestId
          },
          status:{
            [op.eq]: "Pending"
        },
      },  
  }).then(rent => {
      res.status(200).send(rent);
  }).catch(err => {
    console.log(err)
      res.status(500).send(err);
  })
}

exports.approvedReservation = function (req, res, next) { 
  return models.rent.findAll({   
    include: [{ 
      model: models.car,
      required:true
  }],  
      where: {
          guestId:{
              [op.eq]: req.body.rentObj._guestId
          },
          status:{
            [op.eq]: "Approved"
        },
      },  
  }).then(rent => {
      res.status(200).send(rent);
  }).catch(err => {
    console.log(err)
      res.status(500).send(err);
  })
}

exports.completedReservation = function (req, res, next) { 
  return models.rent.findAll({   
    include: [{ 
      model: models.car,
      required:true
  }],  
      where: {
          guestId:{
              [op.eq]: req.body.rentObj._guestId
          },
          status:{
            [op.eq]: "Completed"
        },
      },  
  }).then(rent => {
      res.status(200).send(rent);
  }).catch(err => {
    console.log(err)
      res.status(500).send(err);
  })
}
exports.pendingRequest = function (req, res, next) { 
  return models.rent.findAll({   
    include: [{ 
      model: models.car,
      required:true
  }],  
      where: {
          hostId:{
              [op.eq]: req.body.rentObj._hostId
          },
          status:{
            [op.eq]: "Pending"
        },
      },  
  }).then(rent => {
      res.status(200).send(rent);
  }).catch(err => {
    console.log(err)
      res.status(500).send(err);
  })
}
exports.approvedRequest = function (req, res, next) { 
  return models.rent.findAll({   
    include: [{ 
      model: models.car,
      required:true
  }],  
      where: {
          hostId:{
              [op.eq]: req.body.rentObj._hostId
          },
          status:{
            [op.eq]: "Approved"
        },
      },  
  }).then(rent => {
      res.status(200).send(rent);
  }).catch(err => {
    console.log(err)
      res.status(500).send(err);
  })
}
exports.completedRequest = function (req, res, next) { 
  return models.rent.findAll({   
    include: [{ 
      model: models.car,
      required:true
  }],  
      where: {
          hostId:{
              [op.eq]: req.body.rentObj._hostId
          },
          status:{
            [op.eq]: "Completed"
        },
      },  
  }).then(rent => {
      res.status(200).send(rent);
  }).catch(err => {
    console.log(err)
      res.status(500).send(err);
  })
}

exports.getRental = function (req, res, next) { 
  return models.rent.findAll({   
    include: [{ 
      model: models.car,
      required:true
  }],  
      where: {
          id:{
              [op.eq]: req.body.rentObj._id
          }
      },  
  }).then(rent => {
      res.status(200).send(rent);
  }).catch(err => {
    console.log(err)
      res.status(500).send(err);
  })
}
