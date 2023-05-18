const News = require("../models/news");
const respon = require("../utils/helpers");

controller = {};

controller.getAll = (req, res) => {
    try{
        const news = News.getAll();
        return respon.response(res, 200, "List News", news);

    }catch (error){
        respon.responseErr(res, 500, error, "");
    }
}

controller.create = async (req, res) => {
  try {

    const imagePath = req.file.path;
      const createNews = await News.create({
        foto: imagePath, // atau req.file.path
        judul: req.body.judul,
        author: req.body.author,
        isi: req.body.isi,
      });
      return respon.responseInput(res, 200, createNews);
    
    
  } catch (error) {
    return respon.responseErr(res, 500, "error saat input data News", error.message);
  }
};

controller.update = async (req, res) => {

  let message = "Success";
  try {
    let updateNews = await News.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (updateNews[0] == 0) {
      message = "Update News Data Failed";
      return respon.responseErr(res, 400, message, "");
    }
    else {
        let NewsBaru = await News.findOne({
          where: {
            id: req.params.id,
          },
        });
        return respon.responseInput(res, 200, NewsBaru);
    }
    
  } catch (err) {
    console.log(err);
    return respon.responseErr(res, 500, "Error", err.message);
  }

};

controller.delete = async (req, res) => {
  let message = "Succes";
  try {
    let getOne = await News.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (getOne == null) {
      message = "News Id Not Found";
      return respon.responseErr(res, 400, message, "");
    }
    await News.destroy({
      where: {
        id: req.params.id,
      },
    });
    return respon.responseInput(res, 200, message);
  } catch (error) {
    return respon.responseErr(
      res,
      500,
      "error when dleted data",
      error.message
    );
  }
};

module.exports = controller;
