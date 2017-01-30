var util = require('util')
var express = require('express');
var router = express.Router();

router.use((req, res, next) => {
  req.checkBody(schema)
  req.getValidationResult()
    .then((result) => {
      if (!result.isEmpty()) {
        return next({ status: 400, message: result.useFirstErrorOnly().array() })
      }
      next()
    })
})


module.exports = router;
