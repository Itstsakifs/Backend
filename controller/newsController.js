const News = require("../models/news");
const respon = require("../utils/helpers");

// const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

controller = {};

controller.getAll = async (req, res) => {
  try {
    const news = await News.findAll();
    return respon.response(res, 200, news);
  } catch (error) {
    return respon.responseErr(res, 500, error.message);
  }
}

controller.getOne = async (req, res) => {
  try{
    const news = await News.findOne({
      where: {
        id : req.params.id,
      }
    });
    if (!news) {
      return respon.response(res, 404, "Data not found");
    }
    return respon.response(res, 200, news);
  }catch(err){
    return respon.responseErr(res, 500, err.message);
  }
}

controller.create = async (req, res) => {

  if (!req.files || !req.files.image) {return respon.responseErr(res, 400, "No File Uploaded")}

  const image = req.files.image;
  const ext = path.extname(image.name).toLowerCase();
  const fileName = req.files.image.name.replace(/ /g, '_');
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext)) {return respon.responseErr(res, 422, "Data format not supported")}
  if (image.size > 5000000) {return respon.responseErr(res, 422, "Image must be less than 5 mb")}

  const imagePath = path.join(__dirname, "../public/images/", fileName);
  image.mv(imagePath, async (err) => {
    if (err) {
      return respon.responseErr(res, 500, err.message);
    }
    try {
      const createNews = await News.create({
        image: url,
        judul: req.body.judul,
        author: req.body.author,
        isi: req.body.isi,
      });
      respon.response(res, 201, createNews);
    } catch (err) { respon.responseErr(res, 500, err.message)}
  });
};

controller.update = async (req, res) => {
  const news = await News.findOne({
    where: { id: req.params.id },
  });

  if(!news){return respon.responseErr(res, 404, "data not found")}

  const oldImageUrl = news.image;

  let imageName = "";
  if(req.image != null){imageName = news.image}
  else{
    const image = req.files.image;
    const ext = path.extname(image.name).toLowerCase();
    imageName = req.files.image.name.replace(/ /g, "_");
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext)) {return respon.responseErr(res, 422, "Data format not supported")}
    if (image.size > 5000000) {return respon.responseErr(res, 422, "Image must be less than 5 mb")}

    const imagePath = path.join(__dirname, "../public/images/", imageName);
    image.mv(imagePath, async (err) => {
      if (err) {return respon.responseErr(res, 500, err.message)}
    });
  }
  const url = `${req.protocol}://${req.get("host")}/images/${imageName}`;
  try{
    await News.update({
      image : url,
      judul : req.body.judul,
      author : req.body.author,
      isi : req.body.isi,
    },
    {
      where : {id: req.params.id}
    });

    if (url !== oldImageUrl) {
      // Ambil nama file gambar lama dari URL
      const oldImageFileName = oldImageUrl.split("/").pop();

      // Hapus gambar lama dari direktori
      const oldImagePath = path.join(__dirname, "../public/images/", oldImageFileName);
      fs.unlink(oldImagePath, (err) => {
        if (err) {console.error("Error deleting old image:", err.message)}
      });
    }

    const updatedNews = await News.findOne({
      where: {
        id: req.params.id,
      },
    });
    return respon.response(res, 201, updatedNews);
  }catch (err){
    return respon.responseErr(res, 500, err.message)
  }
  
};

controller.delete = async (req, res) => {
  const news = await News.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!news) {
    return respon.responseErr(res, 404, "Data not found");
  }
  
  
  try {
    const deletedNews = await News.findOne({
      where: {
        id: req.params.id,
      },
    });

    const imageName = news.image.split("/").pop();
    const imagePath = path.resolve(__dirname, "../public/images", imageName);
    fs.unlinkSync(imagePath); // Hapus gambar lama dari direktori
    await News.destroy({
      where: {
        id: req.params.id,
      },
    });

    return respon.response(res, 200, deletedNews , "deleted news successfully");
  } catch (err) {
    return respon.responseErr(res, 500, err.message);
  }
};

module.exports = controller;
