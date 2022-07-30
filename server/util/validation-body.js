
const { validationResult } = require('express-validator')

module.exports = function (req) {
  const errors = validationResult(req)

  return errors.isEmpty() ? true : false
}