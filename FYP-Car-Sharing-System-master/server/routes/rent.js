var express = require('express');
var router = express.Router();
const rent =  require('../controller/rent')

/* GET rent listing. */

router.post('/rentCar', rent.rentCar);
router.post('/requestCar', rent.requestCar);
router.post('/myRentalCar', rent.myRentalCar);
router.post('/approveRental', rent.approveRental);
router.post('/declineRental', rent.declineRental);
router.post('/pendingReservation', rent.pendingReservation);
router.post('/completedReservation', rent.completedReservation);
router.post('/approvedReservation', rent.approvedReservation);
router.post('/pendingRequest', rent.pendingRequest);
router.post('/approvedRequest', rent.approvedRequest);
router.post('/completedRequest', rent.completedRequest);
router.post('/pay', rent.pay);
router.post('/complete', rent.complete);
router.post('/rate', rent.rate);
router.post('/getRental', rent.getRental);


// router.get('/',function(req, res, next){
//     res.send('respond with resource');
// });

module.exports = router;
