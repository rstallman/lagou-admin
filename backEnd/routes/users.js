var express = require('express');
var router = express.Router();

const {signup, list, remove, signin, signout, isAuth} = require('../controllers/users');
const {auth} = require('../middleware/auth');

router.use('/', (req, res, next) => {
  res.set("content-type", "application/json;charset=utf-8");
  next();
})

router.get('/',  auth, list);
router.delete('/', auth, remove);

router.post( '/', auth, signup);
router.post('/signin', signin);
router.get('/signout', auth,  signout);
router.get('/isAuth',  isAuth)
 
module.exports = router;
