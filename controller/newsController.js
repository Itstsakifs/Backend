const News = require("../models/news");
const respon = require("../utils/helpers");

// const crypto = require("crypto");
// const multer = require("multer")

const path = require("path");
const fs = require("fs");

//inisial modul biar sekali export
controller = {};

//      nama controller
//          ||
//          vv
controller.getAll = async (req, res) => {
  try {
    const news = await News.findAll(); //core function
    return respon.response(res, 200, news);//ngirim response pake format di helper
  } catch (error) {
    return respon.responseErr(res, 500, error.message);//response error
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

//input data
controller.create = async (req, res) => {
  //validasi file, user ngirim atau tidak
  if (!req.files || !req.files.image) {return respon.responseErr(res, 400, "No File Uploaded")}
  //data image
  const image = req.files.image;
  const ext = path.extname(image.name).toLowerCase();
  const fileName = req.files.image.name.replace(/ /g, '_');
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];
  //validasi lagi
  if (!allowedType.includes(ext)) {return respon.responseErr(res, 422, "Data format not supported")}//format jenis file
  if (image.size > 5000000) {return respon.responseErr(res, 422, "Image must be less than 5 mb")}//ukuran file

  //fungsi input data gambar ke folder /public/images/
  const imagePath = path.join(__dirname, "../public/images/", fileName);
  image.mv(imagePath, async (err) => {
    if (err) {
      return respon.responseErr(res, 500, err.message);
    }
    try {
      //input data ke database
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

//update data
controller.update = async (req, res) => {
  //get data yang akan di update
  const news = await News.findOne({
    where: { id: req.params.id },
  });
  //validasi data ada atau tidak
  if(!news){return respon.responseErr(res, 404, "data not found")}
  //ambil data gambar lama
  const oldImageUrl = news.image;
  //data gambar baru
  let imageName = "";
  if(req.image != null){imageName = news.image}
  else{
    //get data gambar
    const image = req.files.image;
    const ext = path.extname(image.name).toLowerCase();
    imageName = req.files.image.name.replace(/ /g, "_");
    const allowedType = [".png", ".jpg", ".jpeg"];
    //validasi lagi
    if (!allowedType.includes(ext)) {return respon.responseErr(res, 422, "Data format not supported")}//format jenis file
    if (image.size > 5000000) {return respon.responseErr(res, 422, "Image must be less than 5 mb")}//ukuran file
    //input data gambar
    const imagePath = path.join(__dirname, "../public/images/", imageName);
    image.mv(imagePath, async (err) => {
      if (err) {return respon.responseErr(res, 500, err.message)}
    });
  }
  //get lokasi gambar
  const url = `${req.protocol}://${req.get("host")}/images/${imageName}`;
  try{
    //fungsi update gambar
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
    //data yang sudah di update
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

//delete data 
controller.delete = async (req, res) => {
  //ambil data yang akan di hapus
  const news = await News.findOne({
    where: {
      id: req.params.id,
    },
  });
  //validasi data
  if (!news) {
    return respon.responseErr(res, 404, "Data not found");
  }
  //delete data database
  try {
    const deletedNews = await News.findOne({
      where: {
        id: req.params.id,
      },
    });
    //delete gambar dari folder projek
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
