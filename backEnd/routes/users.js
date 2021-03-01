var express = require('express');
var router = express.Router();

const {signup, list, remove} = require('../controllers/users');


router.use('/', (req, res, next) => {
  res.set("content-type", "application/json;charset=utf-8");
  next();
})

router.post('/', signup );
router.get('/', list);
router.delete('/', remove);

module.exports = router;
