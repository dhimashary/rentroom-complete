const { Accommodation, Type, User } = require("../models");
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
    Accommodation.create(
      {
        authorId: req.loggedInUser.id,
        name,
        facility,
        roomCapacity,
        location,
        price,
        typeId,
        imgUrl,
      },
      {
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
      }
    )
      .then((accommodation) => {
        res.status(200).json(accommodation);
      })
      .catch(next);
  }

  static findAll(req, res, next) {
    Accommodation.findAll({
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
      // Add order conditions here....
      order: [["id", "DESC"]],
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch(next);
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
      .then((result) => {
        if (result === null) {
          throw createError(404, "Accommodation not found !");
        }
        res.status(200).json(result);
      })
      .catch(next);
  }

  static delete(req, res, next) {
    Accommodation.destroy({
      where: {
        id: req.params.accommodationId,
      },
      individualHooks: true
    })
      .then((number) => {
        if (number === 0) {
          throw createError(404, "Accommodation with this ID does not exist");
        } else {
          res.status(200).json({
            message: "Delete success",
          });
        }
      })
      .catch(next);
  }

  static update(req, res, next) {
    const {
      name,
      facility,
      roomCapacity,
      imgUrl,
      location,
      price,
      typeId,
    } = req.body;
    let updatedAccommodation = null;
    let type;
    Accommodation.update(
      {
        name,
        facility,
        roomCapacity,
        location,
        price,
        typeId,
        imgUrl,
      },
      {
        where: {
          id: Number(req.params.accommodationId),
        },
        returning: true,
        individualHooks: true,
        from: "PUT"
      }
    )
      .then((accommodation) => {
        console.log(
          accommodation,
          req.params,
          Number(req.params.accommodationId)
        );
        if (accommodation[0] === 0) {
          throw createError(404, "Accommodation with this ID does not exist");
        } else {
          updatedAccommodation = accommodation[1][0];
          return updatedAccommodation.getType();
        }
      })
      .then((currentType) => {
        type = {
          id: currentType.id,
          name: currentType.name,
        };
        return updatedAccommodation.getUser();
      })
      .then((user) => {
        res.status(200).json({
          ...updatedAccommodation.dataValues,
          Type: type,
          User: { id: user.id, email: user.email },
        });
      })
      .catch(next);
  }

  static updateStatus(req, res, next) {
    let updatedAccommodation = null;
    let type;
    Accommodation.update(
      {
        status: req.body.status
      },
      {
        where: {
          id: Number(req.params.accommodationId),
        },
        returning: true,
        individualHooks: true,
        from: "PATCH"
      }
    )
      .then((accommodation) => {
        if (accommodation[0] === 0) {
          throw createError(404, "Accommodation with this ID does not exist");
        } else {
          updatedAccommodation = accommodation[1][0];
          return updatedAccommodation.getType();
        }
      })
      .then((currentType) => {
        type = {
          id: currentType.id,
          name: currentType.name,
        };
        return updatedAccommodation.getUser();
      })
      .then((user) => {
        res.status(200).json({
          ...updatedAccommodation.dataValues,
          Type: type,
          User: { id: user.id, email: user.email },
        });
      })
      .catch(next);
  }
}

module.exports = AccommodationController;
