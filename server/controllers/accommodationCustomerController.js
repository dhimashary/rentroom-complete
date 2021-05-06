const { Accommodation, Type, User } = require("../models");
const getCustomerQueryFormat = require("../helpers/getCustomerQueryFormat");
const createError = require("http-errors");
class AccommodationCustomerController {
  static findAll(req, res, next) {
    if (
      +req.query.minprice >= +req.query.maxprice
    ) {
      next(
        createError(
          400,
          "Maxprice can't be lower than or equal to minprice"
        )
      );
    } else {
      let whereOptions = getCustomerQueryFormat(req);
      const limit = 3;
      const page = req.query.page || 1;
      const offset = (page - 1) * limit;
      Accommodation.findAndCountAll({
        include: [
          {
            model: Type,
            attributes: ["id", "name"],
          },
          {
            model: User,
            attributes: ["id", "email"],
          },
        ],
        order: [["id", "DESC"]],
        where: whereOptions,
        limit,
        offset,
      })
        .then((result) => {
          res.status(200).json(result);
        })
        .catch(next);
    }
  }
}

module.exports = AccommodationCustomerController;
