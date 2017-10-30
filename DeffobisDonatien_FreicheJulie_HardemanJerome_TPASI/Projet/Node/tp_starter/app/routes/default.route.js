'use strict';

// default.route.js
var express = require("express");
var router = express.Router();
module.exports = router;

var loginController = require('../controllers/login.controller.js');


//var watcher = require('../controllers/watch.controller.js');

// Routing using

/*router.get("/",function(req,res){

res.send("hello world ! :) ");

});*/

router.route("/hello").get(function(req,res){

	res.send(" GET hello world ! :) ");

}).post( function(req,res){

	res.send(" POST hello world ! :) ");

});
router.route("/login").post(loginController.check);
/*router.route("/watch").get(function(req,res){
//lire fichier et l'envoyer 
//res.send("watch.html");


});
*/

//router.route()



	/*.post()
	.put()
	.delete()
	.all()
	.[...]
*/