var express = require('express');
var router = express.Router();

const {add, list, remove} = require('../controllers/positions')

router.use('/', (req, res, next) => {
  res.set("content-type", "application/json;charset=utf-8");
  next();
})

router.post('/add', add)
router.get('/list', list )
router.delete('/remove', remove)

module.exports =  router