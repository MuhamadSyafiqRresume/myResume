var express = require('express');
var router = express.Router();
const car =  require('../controller/car')

/* GET car listing. */
// router.post('/search', user.search);
router.post('/search', car.search);
router.post('/addCar', car.addCar);
router.post('/updateCar', car.updateCar);
router.post('/suspendCar', car.suspendCar);
router.post('/activateCar', car.activateCar);
router.post('/deactivateCar', car.deactivateCar);
router.post('/deleteCar', car.deleteCar);
router.post('/approveCar', car.approveCar);
router.post('/declineCar', car.declineCar);
router.post('/allMyCar', car.myCar);
router.post('/myCar', car.myCar);
router.post('/getCarOwner', car.getCarOwner);
router.post('/myCarActive', car.myCarActive);
router.post('/myCarInactive', car.myCarInactive);
router.post('/getPendingCar', car.getPendingCar);
router.post('/allCar', car.allCar);


// router.get('/',function(req, res, next){
//     res.send('respond with resource');
// });

module.exports = router;
