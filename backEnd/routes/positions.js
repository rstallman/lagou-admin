const express = require('express');
const router = express.Router();

const {add, list, remove} = require('../controllers/positions')
const  uploadMiddleware = require('../middleware/upload')
router.use('/', (req, res, next) => {
  res.set("content-type", "application/json;charset=utf-8");
  next();
})

router.post('/add', uploadMiddleware,  add)
router.get('/list', list )
router.delete('/remove', remove)

module.exports =  router