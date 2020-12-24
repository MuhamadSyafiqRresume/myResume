var express = require('express');
var router = express.Router();
const user =  require('../controller/user')
let {isLoggedIn} = require('../middleware/authenticate');


/* GET users listing. */
router.post('/login', user.login);
router.post('/register', user.register);
router.post('/updateUser', user.updateUser);
router.post('/deleteUser', user.deleteUser);
router.post('/deleteUser', user.upgradeToHost);
router.get('/logout',  user.logout);
router.post('/check_logged', user.check_logged);
router.post('/getUser', user.getUser);
router.post('/getGuest', user.getGuest);
router.post('/getHost', user.getHost);
router.post('/activateUser', user.activateUser);
router.post('/deactivateUser', user.deactivateUser);
router.post('/getPendingGuest', user.getPendingGuest);
router.post('/getPendingHost', user.getPendingHost);
router.post('/approveUser', user.approveUser);
router.post('/declineUser', user.declineUser);
router.post('/addManual', user.addManual);



// router.get('/',function(req, res, next){
//     res.send('respond with resource');
// });

module.exports = router;
