const Op = require("../models").Sequelize.Op;

module.exports = (req) => {
  let whereOptions = {
    status: "active",
  };
  if (req.query.name) {
    let regexFormat = "";
    const splittedName = req.query.name.split(" ");
    splittedName.forEach((name) => {
      regexFormat += `(?=.*${name})`;
    });
    whereOptions.name = { [Op.iRegexp]: regexFormat };
  }
  if (req.query.location) {
    let regexFormat = "";
    const splittedLocation = req.query.location.split(" ");
    splittedLocation.forEach((name) => {
      regexFormat += `(?=.*${name})`;
    });
    whereOptions.location = { [Op.iRegexp]: regexFormat };
  }
  if (req.query.type) {
    const splittedType = req.query.type.split(",");
    whereOptions.typeId = splittedType;
  }
  if (
    req.query.minprice &&
    req.query.maxprice &&
    req.query.minprice < req.query.maxprice
  ) {
    whereOptions.price = { [Op.between]: [+req.query.minprice, +req.query.maxprice] };
  } else if (req.query.minprice) {
    whereOptions.price = { [Op.gte]: +req.query.minprice };
  } else if (req.query.maxprice) {
    whereOptions.price = { [Op.lte]: +req.query.maxprice };
  }
  return whereOptions;
};
