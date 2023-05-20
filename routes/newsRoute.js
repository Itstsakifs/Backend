const express = require("express");
const router = express.Router();

const newsController = require('../controller/newsController');

//menentukan http method untuk endpoint dengan controller nya
//  router method endpoint controller (metod pada controller)
//   ||     ||    ||          ||        ||
//   vv     vv    vv          vv        vv
    router.get("/news", newsController.getAll);
    router.post("/news", newsController.create);
    router.get("/news/:id", newsController.getOne);
    router.patch("/news/:id", newsController.update);
    router.delete("/news/:id", newsController.delete);

module.exports = router;