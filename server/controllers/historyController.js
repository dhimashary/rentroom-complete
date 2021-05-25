const { History } = require("../models");

class HistoryController {
  static findAll(req, res, next) {
    History.findAll({
      order: [["id", "DESC"]],
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch(next);
  }
}

module.exports = HistoryController