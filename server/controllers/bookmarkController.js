const { Bookmark, Accommodation, Type } = require("../models");

class BookmarkController {
  static create(req, res, next) {
    let newBookmark = {}
    const { accommodationId } = req.body;
    Bookmark.create(
      {
        accommodationId,
        customerId: req.loggedInUser.id
      }
    )
    .then(bookmark => {
      newBookmark = {...bookmark.dataValues}
      return bookmark.getAccommodation({
        include: [
          {
            model: Type,
            attributes: ["id", "name"],
          },
        ],
      })
    })
    .then(result => {
      newBookmark.Accommodation = result
      res.status(201).json(newBookmark)
    })
    .catch(next)
  }

  static findMyBookmark(req, res, next) {
    Bookmark.findAll({
      where: {
        customerId: req.loggedInUser.id
      },
      include: [
        {
          model: Accommodation,
          include: [
            {
              model: Type,
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    })
    .then(bookmarks => {
      res.status(200).json(bookmarks)
    })
    .catch(next)
  }
}

module.exports = BookmarkController