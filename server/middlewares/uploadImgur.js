const axios = require("axios");

module.exports = function (req, res, next) {
  console.log(req.file, "DI IMGUR <-----");
  if (req.file) {
    const data64 = req.file.buffer.toString("base64");
    axios({
      method: "POST",
      url: "https://api.imgur.com/3/image",
      headers: {
        Authorization: process.env.IMGUR_CLIENT_ID,
        Accept: "application/json",
      },
      data: {
        image: data64,
        type: "base64",
      },
    })
      .then(({ data }) => {
        if (data.data.link) {
          req.body.imgUrl = data.data.link;
          next();
        } else {
          next(data);
        }
      })
      .catch(next);
  } else {
    next();
  }
};
