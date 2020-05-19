const express = require('express');
const router = express.Router();
const controller = require('../controllers/transaction.controller');

router.get('/', controller.index);
router.post('/', (req, res)=> {
  res.send(req.body);
})

module.exports = router;