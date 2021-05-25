const { Type } = require("../models")

class TypeController {
  static findAll (req, res, next) {
    Type.findAll()
      .then(types => {
        res.status(200).json(types)
      })
      .catch(next)
  }
}

module.exports = TypeController