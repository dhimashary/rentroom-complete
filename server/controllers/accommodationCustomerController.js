const { Accommodation, Type, User } = require("../models");
const getCustomerQueryFormat = require("../helpers/getCustomerQueryFormat");
const createError = require("http-errors");
const axios = require("axios");

class AccommodationCustomerController {
  static findAll(req, res, next) {
    if (+req.query.minprice >= +req.query.maxprice) {
      next(
        createError(400, "Maxprice can't be lower than or equal to minprice")
      );
    } else {
      let whereOptions = getCustomerQueryFormat(req);
      const limit = 12;
      if (req.query.page < 1) {
        req.query.page = 1;
      }
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
  static findById(req, res, next) {
    Accommodation.findByPk(req.params.accommodationId, {
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
    })
      .then(async (result) => {
        if (result === null) {
          throw createError(404, "Accommodation not found !");
        }
        const { data } = await axios({
          method: "GET",
          url: `https://api.happi.dev/v1/qrcode?data=https://rentroom.techindonesia.online/accommodation/${req.params.accommodationId}&width=&dots=000000&bg=FFFFFF&apikey=${process.env.HAPPIDEV_QR_KEY}`,
        });
        result.dataValues.qrcode = data.qrcode;
        res.status(200).json(result);
      })
      .catch(next);
  }
}

module.exports = AccommodationCustomerController;
