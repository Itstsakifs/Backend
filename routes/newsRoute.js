const express = require("express");
const router = express.Router();

const multer = require('multer');
const newsController = require('../controller/newsController');

const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get('/news', newsController.getAll);
router.post("/news", upload.single("image"), newsController.create);

module.exports = router;