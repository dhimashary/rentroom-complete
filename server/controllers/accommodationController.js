const { Accommodation } = require("../models");
const createError = require("http-errors");

class AccommodationController {
  static create(req, res, next) {
    const {
      name,
      facility,
      roomCapacity,
      imgUrl,
      location,
      price,
      typeId,
    } = req.body;
    Accommodation.create({
      authorId: req.loggedInUser.id,
      name,
      facility,
      roomCapacity,
      location,
      price,
      typeId,
      imgUrl,
    }).then((accommodation) => {
      res.status(200).json(accommodation)
    }).catch(next)
  }
}

module.exports = AccommodationController;
