var express = require('express');
var router = express.Router();
const payment =  require('../controller/payment')

/* GET rent listing. */

router.post('/addPayment', payment.addPayment);


// router.get('/',function(req, res, next){
//     res.send('respond with resource');
// });

module.exports = router;
