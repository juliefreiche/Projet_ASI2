// content.route.js
"use strict";

var multer = require("multer");
var express = require("express");
var router = express.Router();
module.exports = router;

var multerMiddleware = multer({ "dest": "/tmp/" });
// router.post("/contents", multerMiddleware.single("file"), function(request, response) {
//     console.log(request.file.path); // The full path to the uploaded file
//     console.log(request.file.originalname); // Name of the file on the user's computer
//     console.log(request.file.mimetype); // Mime type of the file
// });


var contentController = require('../controllers/content.controller.js');

router.route('/contents')
    .get(contentController.list)
    .post(multerMiddleware.single("file"),contentController.create);

router.route('/contents/:Id')
    .get(contentController.read);
    //.put(userController.update)
    //.delete(userController.delete);


router.param('Id',function(req, res, next, id) {
	req.contentId = id;
	next();
});