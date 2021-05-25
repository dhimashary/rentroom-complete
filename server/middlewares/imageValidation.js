const createError = require("http-errors")

module.exports = (req, res, next) => {
  if (req.file) {
    if (
      req.file.mimetype == "image/png" ||
      req.file.mimetype == "image/jpg" ||
      req.file.mimetype == "image/jpeg"
    ) {
      if (req.file.size > 262144) {
        next(createError(400, "Maximum Image Size is 256 KB"))
      } else {
        next()
      }
    } else {
      next(createError(400, "Only .png, .jpg and .jpeg format allowed!"))
    }
  } else if (req.body.imgUrl) {
    next()
  } else {
    next(createError(400, "Image must be provided!"))
  }
}